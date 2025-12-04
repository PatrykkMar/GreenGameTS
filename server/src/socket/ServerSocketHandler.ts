import { Server, Socket } from "socket.io";
import { inject, injectable } from "tsyringe";
import LobbyManager from "../modules/lobby/LobbyManager";
import type { 
    CreateLobbyRequest, JoinLobbyRequest, LeaveLobbyRequest, 
    GetMessagesRequest, GetUserListRequest 
} from "@shared/models/Requests";
import type { BaseResponse } from "@shared/models/Responses";
import { SystemMessage } from "@shared/models/SystemMessage";

@injectable()
export default class ServerSocketHandler {
    private io!: Server;

    constructor(@inject(LobbyManager) private lobbyManager: LobbyManager) {}

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

        socket.on("disconnect", () => this.disconnect(socket));
    }

    private createLobby(socket: Socket, { lobbyId, nick }: CreateLobbyRequest, cb: (res: BaseResponse) => void) {
        if (this.lobbyManager.getLobby(lobbyId)) return cb({ ok: false, error: "Lobby with that id exists." });

        const lobby = this.lobbyManager.createLobby(lobbyId);
        lobby.addUser(socket.id, nick);
        lobby.addMessage({ text: `${nick} created lobby` });
        socket.join(lobbyId);
        cb({ ok: true });
    }

    private joinLobby(socket: Socket, { lobbyId, nick }: JoinLobbyRequest, cb: (res: BaseResponse) => void) {
        const lobby = this.lobbyManager.getLobby(lobbyId);
        if (!lobby) return cb({ ok: false, error: "Lobby does not exist." });

        lobby.addUser(socket.id, nick);
        lobby.addMessage({ text: `${nick} joined the lobby` });
        socket.join(lobbyId);
        cb({ ok: true });
    }

    private leaveLobby(socket: Socket, {  }: LeaveLobbyRequest, cb: (res: BaseResponse) => void) {
        const lobby = this.lobbyManager.getLobbyWithUser(socket.id);
        if (!lobby) return cb({ ok: false });

        this.lobbyManager.removeUserFromAll(socket.id);
        socket.leave(socket.id);

        this.io.to(socket.id).emit("lobbyUsers", lobby.getUsersList());
        cb({ ok: true });
    }

    private getMessages(socket: Socket, {  }: GetMessagesRequest, cb: (res: BaseResponse<SystemMessage[]>) => void) {
        const lobby = this.lobbyManager.getLobbyWithUser(socket.id);
        if (!lobby) return cb({ ok: false, error: "Lobby does not exist." });

        cb({ ok: true, data: Array.from(lobby.messages) });
    }

    private getUserList(socket: Socket, {  }: GetUserListRequest, cb: (res: BaseResponse<string[]>) => void) {
        const lobby = this.lobbyManager.getLobbyWithUser(socket.id);
        if (!lobby) return cb({ ok: false, error: "Lobby does not exist." });

        cb({ ok: true, data: lobby.getUsersList() });
    }

    private disconnect(socket: Socket) {
        this.lobbyManager.removeUserFromAll(socket.id);
    }
}