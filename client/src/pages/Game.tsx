import { useNavigate, useParams } from "react-router-dom";
import { clientSocket } from "../socket";
import SystemMessageWindow from "../components/SystemMessageWindow";
import UsersList from "../components/UsersList";
import Board from "../components/Board";

export default function Game() {
    const { lobbyId } = useParams();
    const navigate = useNavigate();


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

            <div style={{ width: "200px" }}>
                <UsersList />
                <button className="btn btn-outline-danger mb-3" onClick={leaveLobby}>
                    Leave lobby
                </button>
            </div>
            <div className="p-8">
                <Board

                />
            </div>
        </div>
    );
}