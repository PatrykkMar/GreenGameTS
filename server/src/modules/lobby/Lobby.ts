import type { Message } from "./Message";
import User from "./User";

export default class Lobby {
  id: string;
  users: Map<string, User>;
  messages: Set<Message>;

  constructor(id: string) {
    this.id = id;
    this.users = new Map();
    this.messages = new Set();
  }

  addUser(userId: string, nick: string): User {
    const user = new User(userId, nick);
    this.users.set(userId, user);
    return user;
  }

  removeUser(userId: string): void {
    this.users.delete(userId);
  }

  getUsersList(): string[] {
    return [...this.users.values()].map(u => u.nick);
  }

  getUserById(userId: string): User | null {
    return this.users.get(userId) ?? null;
  }

  addMessage(msg: Message): void {
    this.messages.add(msg);
  }
}