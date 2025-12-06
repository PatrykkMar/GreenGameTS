import { WordGroup } from '@shared/models/WordGroup';
export default class BoardTile
{
    public id: number = 0;
    public wordGroup!: WordGroup;
    public rotation: number = 0;
}