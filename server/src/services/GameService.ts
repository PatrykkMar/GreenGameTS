import { CheckRequest, RotateTileRequest } from './../../../shared/src/models/Requests';
import { inject, injectable } from "tsyringe";

import { BaseResponse } from "@shared/models/Responses";
import Board from "../modules/game/Board";
import { DeclareReadyRequest } from "@shared/models/Requests";
import LobbyRepository from '../modules/lobby/LobbyRepository';
import { GameState } from '@shared/models/GameState';
import { WordsGroupService } from '../modules/words/WordGroupsService';

@injectable()
export default class GameService {

    constructor(
        @inject(LobbyRepository) private lobbyManager: LobbyRepository,
        @inject(WordsGroupService)private wordsGroupService: WordsGroupService
    ) {}

    declareReady(request: DeclareReadyRequest): BaseResponse<Board> {
        //TODO
        return { ok: true, data: undefined as unknown as Board };
    }

    rotateTile(request: RotateTileRequest): BaseResponse<Board> {
        //TODO
        return { ok: true, data: undefined as unknown as Board };
    }

    check(request: CheckRequest): BaseResponse<string[]> {
        //TODO
        return { ok: true, data: [] };
    }

    
    getBoard(userId: string): BaseResponse<Board> {
        const lobby = this.lobbyManager.getLobbyWithUser(userId);
        if (!lobby) return { ok: false, error: "Lobby does not exist." };

        let game = lobby.game;

        if (!game) return { ok: false, error: "Lobby has not game created" };

        let player = game.players.get(userId);

        if (!player) return { ok: false, error: "There is not player with the id in the game" };

        let board : Board;

        if(game.state == GameState.Checking)
        {
            board = game.getCheckedBoard()!;
        }
        else if(game.state == GameState.Draft)
        {
            if(player.board)
            {
                board = player.board;
            }
            else
            {
                board = new Board(this.wordsGroupService.getRandomGroups(4))
            }
        }
        else
            return {ok: false, error: "Unknown game state"};

        return { ok: true, data: board };
    }
}