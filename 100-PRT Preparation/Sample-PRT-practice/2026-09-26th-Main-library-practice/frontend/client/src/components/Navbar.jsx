import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const {user, logout} = useAuth() ;
    const navigate = useNavigate() ;
    const handleLogout = () => {
        logout() ;
        navigate('/login') ;
    }
  return (
    <nav className="navbar">
        <h1>TaskManager</h1>
        <div>
            <span>Hi {user.username}</span>
            <button onClick={handleLogout}>Logout</button> 
        </div>
    </nav>
  )
}

export default Navbar
