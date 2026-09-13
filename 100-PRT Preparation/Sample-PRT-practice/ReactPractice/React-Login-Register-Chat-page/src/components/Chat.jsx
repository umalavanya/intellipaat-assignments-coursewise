import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Chat = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  // Mock users for the sidebar as shown in the image
  const mockUsers = [
    { id: 1, name: 'shagun', avatar: 'https://api.multiavatar.com/shagun.png' },
    { id: 2, name: 'Arjun', avatar: 'https://api.multiavatar.com/Arjun.png' },
    { id: 3, name: 'prince', avatar: 'https://api.multiavatar.com/prince.png' },
    { id: 4, name: 'raghav', avatar: 'https://api.multiavatar.com/raghav.png' },
  ];

  useEffect(() => {
    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem('chatUser'));
    if (!user) {
      // If no user is logged in, redirect to login
      navigate('/login');
    } else {
      setCurrentUser(user);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('chatUser');
    navigate('/login');
  };

  if (!currentUser) return null; // Don't render until user is loaded

  return (
    <div className="chat-container">
      {/* Top Navbar */}
      <nav className="navbar">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </nav>

      {/* Main Body */}
      <div className="chat-body">
        {/* Sidebar with Users */}
        <aside className="sidebar">
          {mockUsers.map((user) => (
            <div key={user.id} className="user-item">
              <img src={user.avatar} alt={user.name} className="avatar-small" />
              <span className="user-name">{user.name}</span>
            </div>
          ))}
          
          {/* Current User at the bottom */}
          <div className="user-item active" style={{ marginTop: 'auto', borderTop: '1px solid #2a2a3a' }}>
            <img src={currentUser.avatar} alt={currentUser.username} className="avatar-small" />
            <span className="user-name">{currentUser.username}</span>
          </div>
        </aside>

        {/* Main Chat/Welcome Area */}
        <main className="chat-main">
          <div className="welcome-screen">
            {/* Using a placeholder image for the robot graphic to match the UI */}
            <img 
              src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png" 
              alt="Robot Avatar" 
              className="robot-avatar"
              style={{ filter: 'hue-rotate(180deg) saturate(1.5)' }} /* Adjusting colors to match the orange/blue theme */
            />
            <h1 className="welcome-text">
              Welcome, <span>{currentUser.username}!</span>
            </h1>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chat;