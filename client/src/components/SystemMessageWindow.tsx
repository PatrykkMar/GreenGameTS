import { useEffect, useRef, useState } from "react";
import type { SystemMessage } from "@shared/models/SystemMessage";
import { useSocket } from "../context/SocketContext";


export default function SystemMessageWindow() {
    const [messages, setMessages] = useState<SystemMessage[]>([]);
    const endRef = useRef<HTMLDivElement | null>(null);
    const clientSocket = useSocket();
    useEffect(() => {
        clientSocket.requestMessages().then(res => {
            if (res.ok && res.data) {
                setMessages(res.data);
            }
        });

        const handleSystemMessages = (msg: SystemMessage[]) => {
            setMessages(msg);
        };

        clientSocket.onSystemMesages(handleSystemMessages);

        return () => {
            clientSocket.offSystemMessages(handleSystemMessages);
        };
    }, []);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="border p-3 mb-3" style={{ height: "60vh", overflowY: "auto" }}>
            {messages.map((m, i) => (
                <div key={i} className="mb-2">
                    <i className="text-secondary">{m.text}</i>
                </div>
            ))}
            <div ref={endRef}/>
        </div>
    );
}