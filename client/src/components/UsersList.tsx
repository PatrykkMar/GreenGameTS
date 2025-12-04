import { useEffect, useState } from "react";
import { clientSocket } from "../socket";

export default function UsersList() {
    const [users, setUsers] = useState<string[]>([]);

    useEffect(() => {
        clientSocket.requestUserList().then(res => {
            if (res.ok && res.data) {
                setUsers(res.data);
            }
        });

        const handleUserList = (list: string[]) => {
            setUsers(list);
        };

        clientSocket.onUsers(handleUserList);

        // 3. Sprzątanie
        return () => {
            clientSocket.offUsers(handleUserList);
        };
    }, []);

    return (
        <div className="border p-3">
            <h5>Users in lobby</h5>
            <ul className="list-unstyled mb-0">
                {users.map((nick, i) => (
                    <li key={i}>{nick}</li>
                ))}
            </ul>
        </div>
    );
}