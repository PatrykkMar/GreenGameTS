import Directions from "./Directions";

export default class WordGroup {
  id: number = 0;
  words: string[] = [];

  toMapWithDirections(): Map<string, string>
  {
    let map: Map<string, string> = new Map();
    map.set(Directions.Top, this.words[0])
    map.set(Directions.Right, this.words[1])
    map.set(Directions.Bottom, this.words[2])
    map.set(Directions.Left, this.words[3])
    return map;
  }
}
