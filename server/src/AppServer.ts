import { inject, injectable } from "tsyringe";
import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import path from "path";
import ServerSocketHandler from "./socket/ServerSocketHandler";
import cors from "cors";

@injectable()
export default class AppServer {
    private app = express();
    private httpServer = http.createServer(this.app);
    private io!: SocketIOServer;

    constructor(
        @inject(ServerSocketHandler) private socketHandler: ServerSocketHandler
    ) {}

    init() {
        console.log("[AppServer] Server initialization");

        if (process.env.NODE_ENV === "development") {
            console.log("[AppServer] DEV mode - enabling permissive CORS");
            this.app.use(cors({ origin: "*", credentials: true }));
        }

        this.configureSockets();
        this.configureStaticFiles();

        const PORT = 3000;
        this.httpServer.listen(PORT, () => {
            console.log(`[AppServer] Server running at http://localhost:${PORT}`);
        });
    }

    private configureStaticFiles() {
        if (process.env.NODE_ENV === "development") {
            console.log("[AppServer] DEV mode - frontend works on Vite (5173)");
            return;
        }

        const clientDistPath = path.join(__dirname, "../../client/dist");
        console.log("[AppServer] PROD mode - Serving frontend from:", clientDistPath);

        this.app.use(express.static(clientDistPath));
        this.app.use((req, res) => {
            res.sendFile(path.join(clientDistPath, "index.html"));
        });
    }

    private configureSockets() {
        this.io = new SocketIOServer(this.httpServer, {
            cors: { origin: "*", methods: ["GET","POST"] },
            transports: ["websocket","polling"]
        });

        this.socketHandler.attach(this.io);
    }
}