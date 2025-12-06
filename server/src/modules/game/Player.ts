import { PlayerState } from "@shared/models/PlayerState";
import Board from "./Board";

export default class Player {
  userId: string;
  state: PlayerState;
  board: Board;

  constructor(userId: string, state: PlayerState) {
    this.userId = userId;
    this.state = state;
    this.board = new Board(); 
  }
}