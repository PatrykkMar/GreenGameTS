import { useState, useRef, useEffect } from "react";

interface Message {
    author?: string;
    text?: string;
    system?: boolean;
}

interface ChatWindowProps {
    messages: Message[];
    onSend: (text: string) => void;
}

export default function ChatWindow({ messages, onSend }: ChatWindowProps) {
    const [text, setText] = useState<string>("");
    const endRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    function handleSend() {
        if (!text) return;
        onSend(text);
        setText("");
    }

    return (
        <div>
            <div
                className="border p-3 mb-3"
                style={{ height: "60vh", overflowY: "auto" }}
            >
                {messages.map((m, i) => (
                    <div key={i} className="mb-2">
                        {m.system ? (
                            <i className="text-secondary">{m.text}</i>
                        ) : (
                            <>
                                <b>{m.author}:</b> {m.text}
                            </>
                        )}
                    </div>
                ))}
                <div ref={endRef} />
            </div>

            <div className="d-flex">
                <input
                    className="form-control me-2"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Write a message..."
                    onKeyDown={e => e.key === "Enter" && handleSend()}
                />
                <button className="btn btn-primary" onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    );
}