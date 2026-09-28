import React from 'react'
import { useAuth } from '../context/AuthContext'

function TaskCard({tasks}) {
    const {toggleTask, deleteTask} = useAuth() ;

  return (
    <div>
        <span>task.text</span>
        <button onClick={() => toggleTask(tasks.id)}>{tasks.done?'undo':'Done'}</button>
      
    </div>
  )
}

export default TaskCard
