import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';

function TaskForm() {
    const [text, setText] = useState() ;
    const { addTask } = useAuth() ;
    const handleSubmit = (e) => {
        e.preventDefault() ;
        if(!text.trim) return ;
        addTask(text.trim()) ;
    }
  return (
    
    <div className='task-form'>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="text"
                value={text}
                placeholder='Enter your task here' 
                onChange={(e) =>setText(e.target.value)}/>
                <button type="submit">Add</button>

        </form>

      
    </div>
  )
}

export default TaskForm
