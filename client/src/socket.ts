import { io, Socket } from "socket.io-client";
import ChatService from "./services/ClientSocketHandler";

const socket: Socket = io();
export const chatService = new ChatService(socket);

export default socket;