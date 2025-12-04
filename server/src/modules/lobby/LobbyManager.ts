import { injectable } from "tsyringe";
import Lobby from "./Lobby";

@injectable()
export default class LobbyManager {
  lobbies: Map<string, Lobby> = new Map();

  getLobby(lobbyId: string): Lobby | undefined {
    return this.lobbies.get(lobbyId);
  }

  getLobbyWithUser(userId: string): Lobby | undefined {
    return [...this.lobbies.values()].find(lobby => lobby.users.has(userId));
  }

  getLobbyContainingUser(userId: string): Lobby | undefined {
    for (const lobby of this.lobbies.values()) {
      if (lobby.users.has(userId)) {
        return lobby;
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