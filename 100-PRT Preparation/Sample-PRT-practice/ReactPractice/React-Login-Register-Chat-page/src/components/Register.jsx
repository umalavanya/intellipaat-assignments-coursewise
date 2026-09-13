import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Fetch a random avatar as requested.
      // We use a random number to get different avatars each time.
      const randomId = Math.floor(Math.random() * 10000);
      const response = await fetch(`https://api.multiavatar.com/${randomId}.png`);
      const blob = await response.blob();
      const avatarUrl = URL.createObjectURL(blob);

      // Save user data to localStorage to simulate a logged-in session
      localStorage.setItem('chatUser', JSON.stringify({
        username: formData.username || 'User',
        avatar: avatarUrl
      }));

      // Redirect to chat page
      navigate('/chat');
    } catch (error) {
      console.error("Error fetching avatar:", error);
      // Fallback if API fails
      localStorage.setItem('chatUser', JSON.stringify({
        username: formData.username || 'User',
        avatar: 'https://api.multiavatar.com/4645646.png' // default fallback
      }));
      navigate('/chat');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="logo-container">
        {/* Simple SVG icon for the blue logo */}
        <svg className="logo-icon" width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5L12 2Z" fill="#3b82f6" />
        </svg>
        <span className="logo-text">ECHO PAL</span>
      </div>

      <form className="auth-form" onSubmit={handleRegister}>
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          className="auth-input" 
          onChange={handleChange} 
          required 
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
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
        <input 
          type="password" 
          name="confirmPassword" 
          placeholder="Confirm Password" 
          className="auth-input" 
          onChange={handleChange} 
          required 
        />
        
        <button type="submit" className="auth-btn">CREATE USER</button>
      </form>

      <div className="auth-switch" onClick={() => navigate('/login')}>
        ALREADY HAVE AN ACCOUNT? LOGIN
      </div>
    </div>
  );
};

export default Register;