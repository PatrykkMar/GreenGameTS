import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { clientSocket } from "../socket";
import ChatWindow from "../components/ChatWindow";
import UsersList from "../components/UsersList";


export default function Chat() {
    const { lobbyId } = useParams();
    const navigate = useNavigate();

    const [messages, setMessages] = useState<string[]>([]);
    const [users, setUsers] = useState<string[]>([]);
    const [userNick, setUserNick] = useState<string>("");

    useEffect(() => {
        if (!lobbyId) return;

        const nick = sessionStorage.getItem(`nick_${lobbyId}`) || "";
        setTimeout(() => setUserNick(nick), 0);

        const handleSystem = (msg: string) =>
            setMessages(prev => [msg, ...prev]);


        const handleUsers = (list: string[]) =>
            setUsers(list);

        clientSocket.onSystem(handleSystem);
        clientSocket.onUsers(handleUsers);

        clientSocket.requestUserList(lobbyId).then(res => {
            if (res?.ok) setUsers(res.users);
        });

        return () => {
            clientSocket.offSystem(handleSystem);
            clientSocket.offUsers(handleUsers);
        };
    }, [lobbyId]);

    async function leaveLobby() {
        if (!lobbyId) return;
        await clientSocket.leaveLobby(lobbyId);
        navigate("/join");
    }

    function sendMsg(text: string) {
        if (!text || !lobbyId) return;
        clientSocket.sendMessage(lobbyId, userNick, text);
    }

    return (
        <div className="container mt-4 d-flex">
            <div className="flex-grow-1 me-3">
                <ChatWindow messages={messages} onSend={sendMsg} />
            </div>

            <div style={{ width: "200px" }}>
                <UsersList users={users} />
                <button className="btn btn-outline-danger mb-3" onClick={leaveLobby}>
                    Leave lobby
                </button>
            </div>
        </div>
    );
}