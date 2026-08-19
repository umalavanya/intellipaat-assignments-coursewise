import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import '../styles/TaskForm.css';

const TaskForm = () => {
  const [taskInput, setTaskInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addTask, error, setError } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!taskInput.trim()) {
      setError('Please enter a task description');
      return;
    }

    setIsSubmitting(true);
    
    // Add the task
    const success = addTask(taskInput);
    
    if (success) {
      setTaskInput(''); // Clear input
      setError(null);
    }
    
    setIsSubmitting(false);
  };

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
    // Clear error when user starts typing
    if (error) setError(null);
  };

  return (
    <div className="task-form-container">
      <h3>📝 Add New Task</h3>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="task-input-wrapper">
          <input
            type="text"
            className={`task-input ${error ? 'error' : ''}`}
            placeholder="Enter task description..."
            value={taskInput}
            onChange={handleInputChange}
            disabled={isSubmitting}
            maxLength={200}
          />
          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}
        </div>
        <button 
          type="submit" 
          className="add-task-btn"
          disabled={isSubmitting || !taskInput.trim()}
        >
          {isSubmitting ? 'Adding...' : '➕ Add Task'}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;