import Player from "./Player";
import { PlayerState } from "@shared/models/PlayerState";
import Board from "@shared/models/Board";
import { GameState } from "@shared/models/GameState";

export default class Game
{
    players: Map<string, Player> = new Map(); //userId -> Player
    state: GameState = GameState.Draft;


    //utils

    addPlayer(userId: string)
    {
        let newPlayer = new Player(userId, this.state === GameState.Draft ? PlayerState.Draft : PlayerState.CheckingPlayer);
        this.players.set(userId, newPlayer);
    }

    removePlayer(userId: string)
    {
        this.players.delete(userId);
    }

    getCheckedPlayer(): Player | undefined {
        for (const player of this.players.values()) {
            if (player.state === PlayerState.CheckedPlayer) {
            return player;
            }
        }
        return undefined;
    }

    getCheckedBoard(): Board | undefined {
        const checkedPlayer = this.getCheckedPlayer();
        return checkedPlayer ? checkedPlayer.board : undefined;
    }

    //move methods

    declareReady(playerId: string) : Board
    {
        //TODO
        //get player
        //set game and players states to to appropriate ones
        //return board to check
        //returns board
        return Board.getEmptyBoard();
    }

    rotateTile(tileId: number) : Board
    {
        //TODO
        //get checked player's board
        //find tile
        //increase rotation by one
        //returns board
        return Board.getEmptyBoard();
    }

    check(tileId: number) : boolean
    {
        //TODO
        //get board
        //find tile
        //increase rotation by one
        //returns board
        return true;
    }
}