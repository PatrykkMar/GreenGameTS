import { GameState } from "@shared/models/GameState";
import Player from "./Player";
import { PlayerState } from "@shared/models/PlayerState";
import Board from "./Board";
import Lobby from "../lobby/Lobby";

export default class Game
{
    players: Map<string, Player> = new Map(); //userId -> Player
    state: GameState = GameState.Draft;

    addPlayer(userId: string)
    {
        let newPlayer = new Player(userId, this.state === GameState.Draft ? PlayerState.Draft : PlayerState.CheckingPlayer);
        this.players.set(userId, newPlayer);
    }

    removePlayer(userId: string)
    {
        this.players.delete(userId);
    }

    //move methods

}