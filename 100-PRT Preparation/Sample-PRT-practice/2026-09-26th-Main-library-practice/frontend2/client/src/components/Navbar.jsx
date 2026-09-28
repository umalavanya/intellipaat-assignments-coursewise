import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const {user,logout} = useAuth() ;
    const navigate = useNavigate() ;
    const handleLogout = ()=> {
        logout() ;
        Navigate('/login') ;
    }
  return (
    <nav className="navbar">
        <h1>Task Manager</h1>
        <div>Hi, {user.username}</div>
        <button onClick={logout}>Logout</button>
    </nav>
  )
}

export default Navbar
