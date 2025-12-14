import BoardTile from './BoardTile';
import Directions from './Directions';
import WordGroup from './WordGroup';

export default class Board
{

    boardTiles: BoardTile[] = [];
    inputs: string[] = [];

    constructor(wordGroups: WordGroup[])
    {
        this.boardTiles = [
            { defaultDirection: Directions.Top, words: wordGroups[0].toMapWithDirections(), rotation: 0},
            { defaultDirection: Directions.Bottom, words: wordGroups[1].toMapWithDirections(), rotation: 0},
            { defaultDirection: Directions.Left, words: wordGroups[2].toMapWithDirections(), rotation: 0},
            { defaultDirection: Directions.Right, words: wordGroups[3].toMapWithDirections(), rotation: 0},
        ]
    }

    static getEmptyBoard() : Board
    {
        return {boardTiles:[], inputs:[]} as unknown as Board;
    }
}