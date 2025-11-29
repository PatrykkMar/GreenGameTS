import { Server, Socket } from "socket.io";
import type { CreateLobbyRequest, GetMessagesRequest, GetUserListRequest, JoinLobbyRequest, LeaveLobbyRequest, SendMsgRequest } from "./Requests.js";
import LobbyManager from "../modules/lobby/LobbyManager";
import { Message } from "../modules/lobby/Message";
import { inject, injectable } from "tsyringe";

@injectable()
export default class SocketHandler {
  private io!: Server;

    constructor(
        @inject(LobbyManager) private lobbyManager: LobbyManager
    ) {}

  attach(io: Server) {
    this.io = io;
    io.on("connection", (socket) => this._onConnection(socket));
  }

  private _onConnection(socket: Socket) {
    console.log(`[Connection] Client connected: ${socket.id}`);

    socket.on("createLobby", (data: CreateLobbyRequest, cb: Function) =>
      this._createLobby(socket, data, cb)
    );

    socket.on("joinLobby", (data: JoinLobbyRequest, cb: Function) =>
      this._joinLobby(socket, data, cb)
    );

    socket.on("leaveLobby", (data: LeaveLobbyRequest, cb: Function) =>
      this._leaveLobby(socket, data, cb)
    );

    socket.on("sendMsg", (data: SendMsgRequest) =>
      this._sendMsg(socket, data)
    );

    socket.on("requestMessages", (data: GetMessagesRequest, cb: Function) =>
      this._getMessages(socket, data, cb)
    );

    socket.on("requestUserList", (data: GetUserListRequest, cb: Function) =>
      this._getUserList(socket, data, cb)
    );

    socket.on("disconnect", () => this._disconnect(socket));
  }

  private _createLobby(
    socket: Socket,
    { id, nick }: CreateLobbyRequest,
    cb: Function
  ) {
    if (this.lobbyManager.getLobby(id)) {
      return cb({ ok: false, error: "Lobby with that id exists." });
    }

    const lobby = this.lobbyManager.createLobby(id);
    lobby.addUser(socket.id, nick);

    socket.join(id);
    socket.emit("history", lobby.messages);
    this.io.to(id).emit("lobbyUsers", lobby.getUsersList());

    cb({ ok: true });
  }

  private _joinLobby(
    socket: Socket,
    { id, nick }: JoinLobbyRequest,
    cb: Function
  ) {
    const lobby = this.lobbyManager.getLobby(id);

    if (!lobby) return cb({ ok: false, error: "Lobby does not exist." });

    lobby.addUser(socket.id, nick);
    socket.join(id);

    socket.emit("history", lobby.messages);
    socket.to(id).emit("systemMsg", { text: `${nick} joined the lobby` });
    this.io.to(id).emit("lobbyUsers", lobby.getUsersList());

    cb({ ok: true });
  }

  private _leaveLobby(
    socket: Socket,
    { id }: LeaveLobbyRequest,
    cb: Function
  ) {
    const lobby = this.lobbyManager.getLobby(id);
    if (!lobby) return cb({ ok: false });

    this.lobbyManager.removeUserFromAll(socket.id);
    socket.leave(id);

    this.io.to(id).emit("lobbyUsers", lobby.getUsersList());
    cb({ ok: true });
  }

  private _sendMsg(socket: Socket, { lobbyId, author, text }: SendMsgRequest) {
    const lobby = this.lobbyManager.getLobby(lobbyId);
    if (!lobby) return;

    const msg = new Message({ author, text, timestamp: Date.now() });
    lobby.addMessage(msg);
    this.io.to(lobbyId).emit("message", msg);
  }

  private _getMessages(
    socket: Socket,
    { id }: GetMessagesRequest,
    cb: Function
  ) {
    const lobby = this.lobbyManager.getLobby(id);
    if (!lobby) return cb({ ok: false, error: "Lobby does not exist." });

    cb({ ok: true, messages: lobby.messages });
  }

  private _getUserList(
    socket: Socket,
    { id }: GetUserListRequest,
    cb: Function
  ) {
    const lobby = this.lobbyManager.getLobby(id);
    if (!lobby) return cb({ ok: false, error: "Lobby does not exist." });

    cb({ ok: true, users: lobby.getUsersList() });
  }

  private _disconnect(socket: Socket) {
    this.lobbyManager.removeUserFromAll(socket.id);
  }
}