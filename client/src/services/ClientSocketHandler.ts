import type { BaseResponse } from "@shared/models/Responses";
import { Socket } from "socket.io-client";
import type { SystemMessage } from "@shared/models/SystemMessage";
import Board from "@shared/models/Board";

export default class ClientSocketHandler {
    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }


    //basic events
    init() {
        console.log("Connecting to socket server...");
        this.socket.on("connect", () => {
            console.log("Connected to server", this.socket.id);
        });

        this.socket.on("disconnect", (reason) => {
            console.log("Disconnected:", reason);
        });

        this.socket.on("connect_error", (err) => {
            console.error("Connection error:", err.message);
        });

        this.socket.on("reconnect_attempt", (attempt) => {
            console.log(`Reconnecting... attempt ${attempt}`);
        });

        this.socket.connect();
    }

    createLobby(id: string, nick: string): Promise<BaseResponse> {
        return new Promise(resolve => {
            this.socket.emit("createLobby", { id, nick }, resolve);
        });
    }

    joinLobby(lobbyId: string, nick: string): Promise<BaseResponse> {
        return new Promise(resolve => {
            this.socket.emit("joinLobby", { id: lobbyId, nick }, resolve);
        });
    }

    leaveLobby(): Promise<BaseResponse> {
        return new Promise(resolve => {
            this.socket.emit("leaveLobby", {  }, resolve);
        });
    }

    requestMessages(): Promise<BaseResponse<SystemMessage[]>> {
        return new Promise(resolve => {
            this.socket.emit("requestMessages", {  }, resolve);
        });
    }

    requestUserList(): Promise<BaseResponse<string[]>> {
        return new Promise(resolve => {
            this.socket.emit("requestUserList", {  }, resolve);
        });
    }

    requestBoard(): Promise<BaseResponse<Board>> {
        return new Promise(resolve => {
            this.socket.emit("requestBoard", {  }, resolve);
        });
    }

    onSystemMesages(handler: (systemMsg: SystemMessage) => void): void {
        this.socket.on("systemMsg", handler);
    }
    offSystemMessages(handler: (systemMsg: SystemMessage) => void): void {
        this.socket.off("systemMsg", handler);
    }

    onHistory(handler: (messages: SystemMessage[]) => void): void {
        this.socket.on("history", handler);
    }
    offHistory(handler: (messages: SystemMessage[]) => void): void {
        this.socket.off("history", handler);
    }

    onUsers(handler: (users: string[]) => void): void {
        this.socket.on("lobbyUsers", handler);
    }
    offUsers(handler: (users: string[]) => void): void {
        this.socket.off("lobbyUsers", handler);
    }

    onBoard(handler: (board: Board) => void): void {
        this.socket.on("board", handler);
    }
    offBoard(handler: (board: Board) => void): void {
        this.socket.off("board", handler);
    }
}