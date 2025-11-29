export default class User {
  id: string;
  nick: string;

  constructor(id: string, nick: string) {
    this.id = id;
    this.nick = nick;
  }
}