import type { BaseResponse } from "@shared/models/Responses";
import { Socket } from "socket.io-client";

export interface Message {
    lobbyId: string;
    author: string;
    text: string;
}

export default class ChatService {
    private socket: Socket;

    constructor(socket: Socket) {
        this.socket = socket;
    }

    createLobby(id: string, nick: string): Promise<BaseResponse> {
        return new Promise(resolve => {
            this.socket.emit("createLobby", { id, nick }, resolve);
        });
    }

    joinLobby(id: string, nick: string): Promise<BaseResponse> {
        return new Promise(resolve => {
            this.socket.emit("joinLobby", { id, nick }, resolve);
        });
    }

    leaveLobby(id: string): Promise<BaseResponse> {
        return new Promise(resolve => {
            this.socket.emit("leaveLobby", { id }, resolve);
        });
    }

    sendMessage(lobbyId: string, author: string, text: string): void {
        this.socket.emit("sendMsg", { lobbyId, author, text });
    }

    requestMessages(id: string): Promise<BaseResponse> {
        return new Promise(resolve => {
            this.socket.emit("requestMessages", { id }, resolve);
        });
    }

    requestUserList(id: string): Promise<BaseResponse> {
        return new Promise(resolve => {
            this.socket.emit("requestUserList", { id }, resolve);
        });
    }

    onMessage(handler: (msg: Message) => void): void {
        this.socket.on("message", handler);
    }
    offMessage(handler: (msg: Message) => void): void {
        this.socket.off("message", handler);
    }

    onSystem(handler: (systemMsg: string) => void): void {
        this.socket.on("systemMsg", handler);
    }
    offSystem(handler: (systemMsg: string) => void): void {
        this.socket.off("systemMsg", handler);
    }

    onHistory(handler: (messages: Message[]) => void): void {
        this.socket.on("history", handler);
    }
    offHistory(handler: (messages: Message[]) => void): void {
        this.socket.off("history", handler);
    }

    onUsers(handler: (users: string[]) => void): void {
        this.socket.on("lobbyUsers", handler);
    }
    offUsers(handler: (users: string[]) => void): void {
        this.socket.off("lobbyUsers", handler);
    }
}