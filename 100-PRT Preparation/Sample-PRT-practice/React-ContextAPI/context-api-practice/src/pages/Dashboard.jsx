import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="page dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-card">
        <h2>Welcome back, {user?.name}!</h2>
        <div className="user-info">
          <p><strong>User ID:</strong> {user?.id}</p>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
        <button onClick={logout} className="btn btn-secondary">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;