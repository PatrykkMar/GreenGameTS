import { inject, injectable } from "tsyringe";
import express from "express";
import http from "http";
import { Server as SocketIOServer, Socket } from "socket.io";
import path from "path";
import ServerSocketHandler from "./socket/ServerSocketHandler";

@injectable()
export default class AppServer {
    private app = express();
    private httpServer = http.createServer(this.app);
    private io = new SocketIOServer(this.httpServer);

    constructor(
        @inject(ServerSocketHandler) private socketHandler: ServerSocketHandler
    ) {}

    init() {
        console.log("[AppServer] Server initialization")
        this.configureStaticFiles();
        this.configureSockets();

        const PORT = 3000;

        this.httpServer.listen(PORT, () => {
            console.log(`[AppServer] Server running at http://localhost:${PORT}`);
        });
    }

    private configureStaticFiles() {
        const clientDistPath = path.join(__dirname, "../../client/dist");

        console.log("Serving frontend from:", clientDistPath);

        this.app.use(express.static(clientDistPath));

        this.app.use((req, res) => {
            res.sendFile(path.join(clientDistPath, "index.html"));
        });
    }

    private configureSockets() {
        this.socketHandler.attach(this.io);
    }
}