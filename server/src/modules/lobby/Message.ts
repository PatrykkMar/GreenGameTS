export class Message {
  public author: string;
  public text: string;
  public timestamp: number;

  constructor({ author, text, timestamp }: { author: string; text: string; timestamp: number }) {
    this.author = author;
    this.text = text;
    this.timestamp = timestamp;
  }
}