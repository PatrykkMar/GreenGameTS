import Board from "@shared/models/Board";
import { PlayerState } from "@shared/models/PlayerState";

export default class Player {
  userId: string;
  state: PlayerState;
  board: Board;

  constructor(userId: string, state: PlayerState) {
    this.userId = userId;
    this.state = state;
    this.board = Board.getEmptyBoard(); 
  }
}