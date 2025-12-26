import BoardTile from './BoardTile';
import WordGroup from './WordGroup';

export default class Board
{

    boardTiles: BoardTile[] = [];
    inputs: string[] = [];

    constructor(wordGroups: WordGroup[]) {
        this.boardTiles = [
            {
                rotation: 0,
                words: wordGroups[0].words,
            },
            {
                rotation: 0,
                words: wordGroups[1].words
            },
            {
                rotation: 0,
                words: wordGroups[2].words,
            },
            {
                rotation: 0,
                words: wordGroups[3].words,
            },
        ];
    }

    static getEmptyBoard() : Board
    {
        return {boardTiles:[], inputs:[]} as unknown as Board;
    }
}