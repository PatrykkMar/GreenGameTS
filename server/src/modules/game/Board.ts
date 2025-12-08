import { WordGroup } from './../../../../shared/src/models/WordGroup';
import BoardTile from "@shared/models/BoardTile";

export default class Board
{
    constructor(wordGroups: WordGroup[])
    {
        this.boardTiles = [
            { id: 0, words: wordGroups[0].words, rotation: 0},
            { id: 1, words: wordGroups[1].words, rotation: 0},
            { id: 2, words: wordGroups[1].words, rotation: 0},
            { id: 3, words: wordGroups[1].words, rotation: 0},
        ]
    }

    boardTiles: BoardTile[] = [];
    inputs: string[] = [];

    static getTestBoard() : Board
    {
        return {boardTiles:[], inputs:[]} as unknown as Board;
    }
}