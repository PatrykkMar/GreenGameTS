import { injectable, singleton } from "tsyringe";
import Lobby from "./Lobby";
import GameFactory from "../game/GameFactory";

@singleton()
export default class LobbyRepository {

  lobbies: Map<string, Lobby> = new Map();

  getLobby(lobbyId: string): Lobby | undefined {
    return this.lobbies.get(lobbyId);
  }

  getLobbyWithUser(userId: string): Lobby | undefined {
    for (const lobby of this.lobbies.values()) {
      for (const user of lobby.users.values()) {
        if (user.id === userId) {
          return lobby;
        }
      }
    }
    return undefined;
  }

  createLobby(id: string): Lobby {
    const lobby = new Lobby(id);
    this.lobbies.set(id, lobby);
    return lobby;
  }

  removeUserFromAll(userId: string): void {
    for (const [id, lobby] of this.lobbies) {
      lobby.removeUser(userId);
      lobby.addMessage({text: `${userId} left lobby`})

      if (lobby.users.size === 0) {
        this.lobbies.delete(id);
      }
    }
  }
}