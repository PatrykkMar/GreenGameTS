import React, { useEffect, useMemo, type ReactNode } from 'react';
import { io, Socket } from "socket.io-client";
import ClientSocketHandler from "../services/ClientSocketHandler";
import { SocketContext } from './SocketContext';

interface SocketProviderProps {
  children: ReactNode;
}

export function SocketProvider({ children }: SocketProviderProps) {
  const clientSocket = useMemo(() => {
    const BACKEND_URL = import.meta.env.DEV ? "http://localhost:3000" : undefined;
    const socket: Socket = io(BACKEND_URL, {
      transports: ["websocket", "polling"],
      autoConnect: false,
    });
    return new ClientSocketHandler(socket);
  }, []);

  useEffect(() => {
    clientSocket.init();
    return () => {
      
    };
  }, [clientSocket]);

  return (
    <SocketContext.Provider value={clientSocket}>
      {children}
    </SocketContext.Provider>
  );
}