import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Lobby Chat</h1>

            <button
                className="btn btn-primary"
                onClick={() => navigate("/join")}
            >
                Join or create lobby
            </button>
        </div>
    );
}