import { Server, Socket } from "socket.io";
import { inject, injectable } from "tsyringe";
import type { 
    CreateLobbyRequest, JoinLobbyRequest, LeaveLobbyRequest, 
    GetMessagesRequest, GetUserListRequest, 
    RotateTileRequest,
    DeclareReadyRequest,
    CheckRequest,
    GetBoardRequest
} from "@shared/models/Requests";
import type { BaseResponse } from "@shared/models/Responses";
import { SystemMessage } from "@shared/models/SystemMessage";
import LobbyService from "../services/LobbyService";
import GameService from "../services/GameService";
import Board from "@shared/models/Board";

@injectable()
export default class ServerSocketHandler {
    private io!: Server;

    constructor(
        @inject(LobbyService) private lobbyService: LobbyService,
        @inject(GameService) private gameService: GameService
    ) {}

    attach(io: Server) {
        this.io = io;
        io.on("connection", (socket) => this.onConnection(socket));
    }

    private onConnection(socket: Socket) {

        console.log(`[ServerSocketHandler] Client connected: ${socket.id}`);

        //lobby actions

        socket.on("createLobby", (data: CreateLobbyRequest, cb: (res: BaseResponse) => void) => {
            console.log("[ServerSocketHandler] createLobby requested");
            this.createLobby(socket, data, cb);
        });

        socket.on("joinLobby", (data: JoinLobbyRequest, cb: (res: BaseResponse) => void) => {
            console.log("[ServerSocketHandler] joinLobby requested");
            this.joinLobby(socket, data, cb);
        });

        socket.on("leaveLobby", (data: LeaveLobbyRequest, cb: (res: BaseResponse) => void) => {
            console.log("[ServerSocketHandler] leaveLobby requested");
            this.leaveLobby(socket, data, cb);
        });

        //component requests

        socket.on("requestMessages", (data: GetMessagesRequest, cb: (res: BaseResponse<SystemMessage[]>) => void) => {
            console.log("[ServerSocketHandler] requestMessages requested");
            this.getMessages(socket, data, cb);
        });

        socket.on("requestUserList", (data: GetUserListRequest, cb: (res: BaseResponse<string[]>) => void) => {
            console.log("[ServerSocketHandler] requestUserList requested");
            this.getUserList(socket, data, cb);
        });

        socket.on("requestBoard", (data: GetBoardRequest, cb: (res: BaseResponse<Board>) => void) => {
            console.log("[ServerSocketHandler] requestBoard requested");
            this.getBoard(socket, data, cb);
        });
        
        //gane requests

        socket.on("declareReady", (data: DeclareReadyRequest, cb: (res: BaseResponse<Board>) => void) => {
            console.log("[ServerSocketHandler] declareReady requested");
            this.declareReady(socket, data, cb);
        });

        socket.on("rotateTile", (data: RotateTileRequest, cb: (res: BaseResponse<Board>) => void) => {
            console.log("[ServerSocketHandler] rotateTile requested");
            this.rotateTile(socket, data, cb);
        });

        socket.on("check", (data: CheckRequest, cb: (res: BaseResponse<string[]>) => void) => {
            console.log("[ServerSocketHandler] check requested");
            this.check(socket, data, cb);
        });

        socket.on("disconnect", () => {
            console.log("[ServerSocketHandler] disconnect requested");
            this.disconnect(socket);
        });
    }

    // Lobby methods

    private createLobby(socket: Socket, { lobbyId, nick }: CreateLobbyRequest, cb: (res: BaseResponse) => void) {
        const res = this.lobbyService.createLobby(lobbyId, socket.id, nick);
        if (res.ok) socket.join(lobbyId);
        cb(res);
    }

    private joinLobby(socket: Socket, { lobbyId, nick }: JoinLobbyRequest, cb: (res: BaseResponse) => void) {
        const res = this.lobbyService.joinLobby(lobbyId, socket.id, nick);
        if (res.ok) {
            socket.join(lobbyId);
            this.updateRoom(lobbyId);
        }
        cb(res);
    }

    private leaveLobby(socket: Socket, request: LeaveLobbyRequest, cb: (res: BaseResponse) => void) {
        const lobbyId = this.lobbyService.getLobbyIdByUserId(socket.id);
        
        const res = this.lobbyService.leaveLobby(socket.id);
        
        if (res.ok && lobbyId) {
            socket.leave(lobbyId);
            this.updateRoom(lobbyId);
        }
        cb(res);
    }

    // Game methods

    private declareReady(socket: Socket, request: DeclareReadyRequest, cb: (res: BaseResponse<Board>) => void) {
        //TODO
        cb(this.gameService.declareReady(request));
    }

    private rotateTile(socket: Socket, request: RotateTileRequest, cb: (res: BaseResponse<Board>) => void) {
        //TODO
        cb(this.gameService.rotateTile(request));
    }

    private check(socket: Socket, request: CheckRequest, cb: (res: BaseResponse<string[]>) => void) {
        //TODO
        cb(this.gameService.check(request));
    }

    //Component methods
    
    private getMessages(socket: Socket, request: GetMessagesRequest, cb: (res: BaseResponse<SystemMessage[]>) => void) {
        const res = this.lobbyService.getMessages(socket.id);
        cb(res);
    }

    private getUserList(socket: Socket, request: GetUserListRequest, cb: (res: BaseResponse<string[]>) => void) {
        const res = this.lobbyService.getUserList(socket.id);
        cb(res);
    }

    private getBoard(socket: Socket, request: GetBoardRequest, cb: (res: BaseResponse<Board>) => void) {
        const res = this.gameService.getBoard(socket.id);
        cb(res);
    }

    // Other

    private updateRoom(lobbyId: string) {
        const data = this.lobbyService.getLobbyData(lobbyId);
        
        if (data) {
            console.log(`[ServerSocketHandler] Broadcasting update to room: ${lobbyId}`);
            console.log(data);
            
            this.io.to(lobbyId).emit("systemMsg", data.messages);
            this.io.to(lobbyId).emit("lobbyUsers", data.users);
        }
    }

    private disconnect(socket: Socket) {
        const lobbyId = this.lobbyService.getLobbyIdByUserId(socket.id);
        this.lobbyService.leaveLobby(socket.id);
        
        if (lobbyId) {
            this.updateRoom(lobbyId);
        }
    }
}