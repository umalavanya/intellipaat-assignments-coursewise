import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="page home">
      <h1>Welcome to MyApp</h1>
      {isAuthenticated ? (
        <>
          <p>Hello, {user?.name}! You're logged in.</p>
          <Link to="/dashboard" className="btn">
            Go to Dashboard
          </Link>
        </>
      ) : (
        <>
          <p>Please login or register to continue</p>
          <div className="btn-group">
            <Link to="/login" className="btn">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;