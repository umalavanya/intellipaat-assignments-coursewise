import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import '../styles/TaskItem.css';

const TaskItem = ({ task }) => {
  const { toggleComplete, deleteTask, editTask } = useTasks();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.description);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleComplete = () => {
    toggleComplete(task.id);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${task.description}"?`)) {
      setIsDeleting(true);
      setTimeout(() => {
        deleteTask(task.id);
      }, 300);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditValue(task.description);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editValue.trim()) {
      const success = editTask(task.id, editValue);
      if (success) {
        setIsEditing(false);
      }
    }
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditValue(task.description);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: 'numeric'
      });
    }
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''} ${isDeleting ? 'deleting' : ''}`}>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={handleToggleComplete}
        aria-label={`Mark "${task.description}" as ${task.completed ? 'pending' : 'completed'}`}
      />

      {isEditing ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <input
            type="text"
            className="edit-input"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            maxLength={200}
            placeholder="Edit task..."
          />
          <div className="edit-actions">
            <button type="submit" className="save-edit-btn">💾 Save</button>
            <button type="button" className="cancel-edit-btn" onClick={handleEditCancel}>✖ Cancel</button>
          </div>
        </form>
      ) : (
        <>
          <span className="task-description">{task.description}</span>
          
          <span className="task-timestamp">
            {task.completed ? '✅ ' : '⏳ '}
            {formatDate(task.createdAt)}
          </span>
          
          <div className="task-actions">
            <button 
              className="task-action-btn edit-btn"
              onClick={handleEdit}
              aria-label="Edit task"
              title="Edit task"
            >
              ✏️
            </button>
            <button 
              className="task-action-btn delete-btn"
              onClick={handleDelete}
              aria-label="Delete task"
              title="Delete task"
            >
              🗑️
            </button>
          </div>
        </>
      )}
    </li>
  );
};

export default TaskItem;