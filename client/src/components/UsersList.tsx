export default function UsersList({ users }) {
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