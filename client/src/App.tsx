import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import JoinLobby from './pages/JoinLobby';
import Game from './pages/Game';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/join" element={<JoinLobby />} />
                <Route path="/chat/:lobbyId" element={<Game />} />
            </Routes>
        </BrowserRouter>
    );
}


export default App
