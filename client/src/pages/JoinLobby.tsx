import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { 
    BaseResponse
} from "@shared/models/Responses";
import { useSocket } from "../context/SocketContext";

export default function JoinLobby() {
    const [lobbyId, setLobbyId] = useState("");
    const [nick, setNick] = useState("");
    
    const navigate = useNavigate();
    const clientSocket = useSocket();

    function storeNick() {
        sessionStorage.setItem(`nick_${lobbyId}`, nick);
    }

    function handleCreate() {
        if (!lobbyId || !nick) return;

        storeNick();

        clientSocket.createLobby(lobbyId, nick).then((res: BaseResponse) => {
            if (res.ok) navigate(`/chat/${lobbyId}`);
            else alert(res.error);
        });
    }

    function handleJoin() {
        if (!lobbyId || !nick) return;

        storeNick();

        clientSocket.joinLobby(lobbyId, nick).then(res => {
            if (res.ok) navigate(`/chat/${lobbyId}`);
            else alert(res.error);
        });
    }

    return (
        <div className="container mt-4">
            <h2>Dołącz lub stwórz lobby</h2>

            <input
                className="form-control mb-2"
                placeholder="ID lobby"
                value={lobbyId}
                onChange={e => setLobbyId(e.target.value)}
            />

            <input
                className="form-control mb-2"
                placeholder="Twój nick"
                value={nick}
                onChange={e => setNick(e.target.value)}
            />

            <div className="d-flex gap-2">
                <button className="btn btn-success" onClick={handleCreate}>Stwórz</button>
                <button className="btn btn-primary" onClick={handleJoin}>Dołącz</button>
            </div>
        </div>
    );
}