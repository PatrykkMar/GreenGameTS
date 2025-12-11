export default class BoardTile
{
    public defaultDirection: string = '';
    public words: Map <string,string> = new Map(); //direction -> word
    public rotation: number = 0;
}