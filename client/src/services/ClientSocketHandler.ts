import type { BaseResponse } from "@shared/models/Responses";
import { Socket } from "socket.io-client";
import type { SystemMessage } from "@shared/models/SystemMessage";

export default class ClientSocketHandler {
    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
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
}