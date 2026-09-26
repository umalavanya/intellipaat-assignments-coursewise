import React from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'

function Dashboard() {
    const {user} = useAuth() ;
  return (
    <div className="dashboard" >
      <Navbar/>
      <div className="dashboard-content">
        <h2>Welcome!! {user?.username}</h2>
        <p>Your tasks will appear here.</p>
      </div>
    </div>
  )
}

export default Dashboard
