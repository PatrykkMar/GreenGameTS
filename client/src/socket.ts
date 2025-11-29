import { io, Socket } from "socket.io-client";
import ClientSocketHandler from "./services/ClientSocketHandler";

const socket: Socket = io();
export const clientSocket = new ClientSocketHandler(socket);

export default socket;