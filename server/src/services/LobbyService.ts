import { inject, injectable } from "tsyringe";
import LobbyManager from "../modules/lobby/LobbyRepository";
import GameFactory from "../modules/game/GameFactory";
import { BaseResponse } from "@shared/models/Responses";
import { SystemMessage } from "@shared/models/SystemMessage";

@injectable()
export default class LobbyService {

    constructor(
        @inject(LobbyManager) private lobbyManager: LobbyManager,
        @inject(GameFactory) private gameFactory: GameFactory
    ) {}

    createLobby(lobbyId: string, userId: string, nick: string): BaseResponse {
        if (this.lobbyManager.getLobby(lobbyId)) {
            return { ok: false, error: "Lobby with that id exists." };
        }

        const lobby = this.lobbyManager.createLobby(lobbyId);
        lobby.addUser(userId, nick);
        lobby.addMessage({ text: `${nick} created lobby` });
        lobby.createGame(this.gameFactory);

        return { ok: true };
    }

    joinLobby(lobbyId: string, userId: string, nick: string): BaseResponse {
        const lobby = this.lobbyManager.getLobby(lobbyId);
        if (!lobby) {
            return { ok: false, error: "Lobby does not exist." };
        }

        lobby.addUser(userId, nick);
        lobby.addMessage({ text: `${nick} joined the lobby` });

        return { ok: true };
    }

    leaveLobby(userId: string): BaseResponse {
        const lobby = this.lobbyManager.getLobbyWithUser(userId);
        if (!lobby) return { ok: false };

        this.lobbyManager.removeUserFromAll(userId);
        return { ok: true };
    }

    getMessages(userId: string): BaseResponse<SystemMessage[]> {
        const lobby = this.lobbyManager.getLobbyWithUser(userId);
        if (!lobby) return { ok: false, error: "Lobby does not exist." };

        return { ok: true, data: Array.from(lobby.messages) };
    }

    getUserList(userId: string): BaseResponse<string[]> {
        const lobby = this.lobbyManager.getLobbyWithUser(userId);
        if (!lobby) return { ok: false, error: "Lobby does not exist." };

        return { ok: true, data: lobby.getUsersList() };
    }
}