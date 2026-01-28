import { io, Socket } from "socket.io-client";
import ClientSocketHandler from "./services/ClientSocketHandler";

console.log("Environment: " + import.meta.env.MODE);

const BACKEND_URL =
    import.meta.env.MODE === "development"
        ? "http://localhost:3000"
        : undefined;

const socket: Socket = io(BACKEND_URL, {
    transports: ["websocket", "polling"],
    autoConnect: false,
});

const clientSocket = new ClientSocketHandler(socket);
clientSocket.init();
export default clientSocket;

//TODO: Refactor