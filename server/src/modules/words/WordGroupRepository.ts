import WordGroup from '@shared/models/WordGroup';
import fs from 'fs';
import path from 'path';
import { injectable } from 'tsyringe';

@injectable()
export class WordsGroupRepository {
  private wordGroups: WordGroup[] = [];
  private jsonFilePath: string = path.join(__dirname, 'wordGroups.json')

  loadWordGroups(): void {
    try {
      const data = fs.readFileSync(this.jsonFilePath, 'utf-8');
      this.wordGroups = JSON.parse(data);
      console.log(`[WordGroupsService] Loaded ${this.wordGroups.length} word groups.`);
    } catch (err) {
      console.error(`[WordGroupsService] Error loading JSON file:`, err);
    }
  }

  getRandomGroups(amount: number): WordGroup[] {
    if (this.wordGroups.length === 0) {
      console.log('[WordGroupsService] No word groups loaded yet');
      this.loadWordGroups();
    }

    const result: WordGroup[] = [];

    for (let i = 0; i < amount; i++) {
      if (this.wordGroups.length === 0) break;
      const index = Math.floor(Math.random() * this.wordGroups.length);
      result.push(this.wordGroups.splice(index, 1)[0]);
    }

    console.log(`[WordGroupsService] Returning ${result.length} random word groups (removed from list).`);
    return result;
  }
}