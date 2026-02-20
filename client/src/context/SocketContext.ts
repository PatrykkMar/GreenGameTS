import { createContext, useContext } from 'react';
import ClientSocketHandler from "../services/ClientSocketHandler";

export const SocketContext = createContext<ClientSocketHandler | null>(null);


export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) throw new Error("[SocketContext] useSocket must be used within SocketProvider");
    return context;
};