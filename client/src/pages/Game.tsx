import { useNavigate, useParams } from "react-router-dom";

import SystemMessageWindow from "../components/SystemMessageWindow";
import UsersList from "../components/UsersList";
import BoardComponent from "../components/board/BoardComponent";
import { useSocket } from "../context/SocketContext";

export default function Game() {
    const { lobbyId } = useParams();
    const navigate = useNavigate();
    const clientSocket = useSocket();

    async function leaveLobby() {
        if (!lobbyId) return;
        await clientSocket.leaveLobby();
        navigate("/join");
    }

    return (
        <div className="container mt-4 d-flex">
            <div className="flex-grow-1 me-3">
                <SystemMessageWindow  />
            </div>

            <div>
                <UsersList />
                <button className="btn btn-outline-danger mb-3" onClick={leaveLobby}>
                    Leave lobby
                </button>
            </div>
            <div>
                <BoardComponent/>
            </div>
        </div>
    );
}