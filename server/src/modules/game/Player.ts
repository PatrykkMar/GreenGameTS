import Board from "@shared/models/Board";
import { PlayerState } from "@shared/models/PlayerState";

export default class Player {
  userId: string;
  state: PlayerState;
  board: Board | undefined;

  constructor(userId: string, state: PlayerState) {
    this.userId = userId;
    this.state = state;
  }
}