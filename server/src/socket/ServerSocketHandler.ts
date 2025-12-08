import { Server, Socket } from "socket.io";
import { inject, injectable } from "tsyringe";
import type { 
    CreateLobbyRequest, JoinLobbyRequest, LeaveLobbyRequest, 
    GetMessagesRequest, GetUserListRequest, 
    RotateTileRequest,
    DeclareReadyRequest,
    CheckRequest
} from "@shared/models/Requests";
import type { BaseResponse } from "@shared/models/Responses";
import { SystemMessage } from "@shared/models/SystemMessage";
import type Board from "../modules/game/Board";
import LobbyService from "../services/LobbyService";
import GameService from "../services/GameService";

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
        socket.on("createLobby", (data: CreateLobbyRequest, cb: (res: BaseResponse) => void) =>
            this.createLobby(socket, data, cb)
        );

        socket.on("joinLobby", (data: JoinLobbyRequest, cb: (res: BaseResponse) => void) =>
            this.joinLobby(socket, data, cb)
        );

        socket.on("leaveLobby", (data: LeaveLobbyRequest, cb: (res: BaseResponse) => void) =>
            this.leaveLobby(socket, data, cb)
        );

        socket.on("requestMessages", (data: GetMessagesRequest, cb: (res: BaseResponse<SystemMessage[]>) => void) =>
            this.getMessages(socket, data, cb)
        );

        socket.on("requestUserList", (data: GetUserListRequest, cb: (res: BaseResponse<string[]>) => void) =>
            this.getUserList(socket, data, cb)
        );

        socket.on("declareReady", (data: DeclareReadyRequest, cb: (res: BaseResponse<Board>) => void) =>
            this.declareReady(socket, data, cb)
        );

        socket.on("rotateTile", (data: RotateTileRequest, cb: (res: BaseResponse<Board>) => void) =>
            this.rotateTile(socket, data, cb)
        );

        socket.on("check", (data: CheckRequest, cb: (res: BaseResponse<string[]>) => void) =>
            this.check(socket, data, cb)
        );

        socket.on("disconnect", () => this.disconnect(socket));
    }

    // Lobby methods

    private createLobby(socket: Socket, { lobbyId, nick }: CreateLobbyRequest, cb: (res: BaseResponse) => void) {
        const res = this.lobbyService.createLobby(lobbyId, socket.id, nick);
        if (res.ok) socket.join(lobbyId);
        cb(res);
    }

    private joinLobby(socket: Socket, { lobbyId, nick }: JoinLobbyRequest, cb: (res: BaseResponse) => void) {
        const res = this.lobbyService.joinLobby(lobbyId, socket.id, nick);
        if (res.ok) socket.join(lobbyId);
        cb(res);
    }

    private leaveLobby(socket: Socket, request: LeaveLobbyRequest, cb: (res: BaseResponse) => void) {
        const res = this.lobbyService.leaveLobby(socket.id);
        socket.leave(socket.id);
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

    private getBoard(socket: Socket, request: GetUserListRequest, cb: (res: BaseResponse<Board>) => void) {
        const res = this.gameService.getBoard(socket.id);
        cb(res);
    }

    // Other

    private disconnect(socket: Socket) {
        this.lobbyService.leaveLobby(socket.id);
    }
}