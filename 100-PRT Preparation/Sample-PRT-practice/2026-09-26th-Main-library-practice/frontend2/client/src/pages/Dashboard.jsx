import React from 'react'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';

function Dashboard() {
    const {user, tasks} = useAuth() ;
  return (
    <div className='dashboard'>
        <Navbar/>
        <div className='dashboard-cotent'>
            Welcome, {user?.username}
            <TaskForm/>
            <div>
                {tasks.length === 0 ? (<p>No tasks yet</p>) :(
                    tasks.map((task) => <TaskCard key={task.id} task={task}/>)
                ) }
            </div>
        </div>
    </div>
  )
}

export default Dashboard
