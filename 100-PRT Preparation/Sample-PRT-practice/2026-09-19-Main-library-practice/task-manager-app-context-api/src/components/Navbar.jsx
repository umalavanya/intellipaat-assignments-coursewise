import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <h1>Task Manager</h1>
      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Hi, {user.name}</span>
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </nav>
  );
}