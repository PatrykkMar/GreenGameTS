import { Server, Socket } from "socket.io";
import { inject, injectable } from "tsyringe";
import LobbyManager from "../modules/lobby/LobbyManager";
import type { 
    CreateLobbyRequest, JoinLobbyRequest, LeaveLobbyRequest, 
    SendMsgRequest, GetMessagesRequest, GetUserListRequest 
} from "@shared/models/Requests";
import type { BaseResponse } from "@shared/models/Responses";
import { Message } from "../modules/lobby/Message";

@injectable()
export default class SocketHandler {
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

        socket.on("sendMsg", (data: SendMsgRequest) =>
            this.sendMsg(socket, data)
        );

        socket.on("requestMessages", (data: GetMessagesRequest, cb: (res: BaseResponse<Message[]>) => void) =>
            this.getMessages(socket, data, cb)
        );

        socket.on("requestUserList", (data: GetUserListRequest, cb: (res: BaseResponse<string[]>) => void) =>
            this.getUserList(socket, data, cb)
        );

        socket.on("disconnect", () => this.disconnect(socket));
    }

    private createLobby(socket: Socket, { id, nick }: CreateLobbyRequest, cb: (res: BaseResponse) => void) {
        if (this.lobbyManager.getLobby(id)) return cb({ ok: false, error: "Lobby with that id exists." });

        const lobby = this.lobbyManager.createLobby(id);
        lobby.addUser(socket.id, nick);

        socket.join(id);
        socket.emit("history", lobby.messages);
        this.io.to(id).emit("lobbyUsers", lobby.getUsersList());

        cb({ ok: true });
    }

    private joinLobby(socket: Socket, { id, nick }: JoinLobbyRequest, cb: (res: BaseResponse) => void) {
        const lobby = this.lobbyManager.getLobby(id);
        if (!lobby) return cb({ ok: false, error: "Lobby does not exist." });

        lobby.addUser(socket.id, nick);
        socket.join(id);

        socket.emit("history", lobby.messages);
        socket.to(id).emit("systemMsg", { text: `${nick} joined the lobby` });
        this.io.to(id).emit("lobbyUsers", lobby.getUsersList());

        cb({ ok: true });
    }

    private leaveLobby(socket: Socket, { id }: LeaveLobbyRequest, cb: (res: BaseResponse) => void) {
        const lobby = this.lobbyManager.getLobby(id);
        if (!lobby) return cb({ ok: false });

        this.lobbyManager.removeUserFromAll(socket.id);
        socket.leave(id);

        this.io.to(id).emit("lobbyUsers", lobby.getUsersList());
        cb({ ok: true });
    }

    private sendMsg(socket: Socket, { lobbyId, author, text }: SendMsgRequest) {
        const lobby = this.lobbyManager.getLobby(lobbyId);
        if (!lobby) return;

        const msg = new Message({ author, text, timestamp: Date.now() });
        lobby.addMessage(msg);
        this.io.to(lobbyId).emit("message", msg);
    }

    private getMessages(socket: Socket, { id }: GetMessagesRequest, cb: (res: BaseResponse<Message[]>) => void) {
        const lobby = this.lobbyManager.getLobby(id);
        if (!lobby) return cb({ ok: false, error: "Lobby does not exist." });

        cb({ ok: true, data: Array.from(lobby.messages) });
    }

    private getUserList(socket: Socket, { id }: GetUserListRequest, cb: (res: BaseResponse<string[]>) => void) {
        const lobby = this.lobbyManager.getLobby(id);
        if (!lobby) return cb({ ok: false, error: "Lobby does not exist." });

        cb({ ok: true, data: lobby.getUsersList() });
    }

    private disconnect(socket: Socket) {
        this.lobbyManager.removeUserFromAll(socket.id);
    }
}