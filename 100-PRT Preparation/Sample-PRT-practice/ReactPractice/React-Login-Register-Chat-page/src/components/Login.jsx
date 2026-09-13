import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Check if a user was previously created in localStorage
    let existingUser = JSON.parse(localStorage.getItem('chatUser'));

    if (!existingUser) {
      // If no user exists, fetch a random avatar for the entered username
      try {
        const randomId = Math.floor(Math.random() * 10000);
        const response = await fetch(`https://api.multiavatar.com/${randomId}.png`);
        const blob = await response.blob();
        const avatarUrl = URL.createObjectURL(blob);
        
        existingUser = {
          username: formData.username || 'User',
          avatar: avatarUrl
        };
      } catch (error) {
        console.error("Error fetching avatar:", error);
        existingUser = {
          username: formData.username || 'User',
          avatar: 'https://api.multiavatar.com/4645646.png'
        };
      }
    } else {
      // Update username if they log in with a different one
      existingUser.username = formData.username || existingUser.username;
    }

    localStorage.setItem('chatUser', JSON.stringify(existingUser));
    navigate('/chat');
  };

  return (
    <div className="auth-wrapper">
      <div className="logo-container">
        <svg className="logo-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5L12 2Z" fill="#3b82f6" />
        </svg>
        <span className="logo-text">ECHO PAL</span>
      </div>

      <form className="auth-form" onSubmit={handleLogin}>
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          className="auth-input" 
          onChange={handleChange} 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          className="auth-input" 
          onChange={handleChange} 
          required 
        />
        
        <button type="submit" className="auth-btn">LOG IN</button>
      </form>

      <div className="auth-switch" onClick={() => navigate('/register')}>
        DON'T HAVE AN ACCOUNT? CREATE ONE.
      </div>
    </div>
  );
};

export default Login;