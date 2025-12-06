import { injectable } from "tsyringe";
import Lobby from "../lobby/Lobby";
import Game from "./Game";

@injectable()
export default class GameFactory {
  createFromLobby(lobby: Lobby): Game {
    const game = new Game();

    for (const [userId, user] of lobby.users.entries()) {
      game.addPlayer(userId);
    }

    return game;
  }
}