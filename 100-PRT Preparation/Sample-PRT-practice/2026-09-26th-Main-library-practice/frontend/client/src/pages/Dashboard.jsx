import React from 'react'
import Navbar from '../components/Navbar'
import TaskForm from '../components/TaskForm' ;
import { useAuth } from '../context/AuthContext'

function Dashboard() {
    const {user,tasks} = useAuth() ;
  return (
    <div className='dashboard'>
        <Navbar/>
        <div className="dashboard-content">
            <h2>Welcome, {user?.username}</h2>
            <p>Your tasks will appear here</p>
            <TaskForm/>
            <div>
                {tasks.length === 0 ? (<p> No tasks yet </p>) : (tasks.map((task) => <div>{task}</div>))}
            </div>
        </div>
      
    </div>
  )
}

export default Dashboard
