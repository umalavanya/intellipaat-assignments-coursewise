import React from 'react';
import { useTasks } from '../context/TaskContext';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

const TaskList = () => {
  const { tasks, clearAllTasks } = useTasks();
  
  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  if (tasks.length === 0) {
    return (
      <div className="task-list-container">
        <div className="task-list-header">
          <h3>📋 Your Tasks</h3>
        </div>
        <div className="empty-state">
          <div className="empty-state-icon">📝</div>
          <p className="empty-state-text">No tasks yet!</p>
          <p className="empty-state-subtext">Add your first task using the form above.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h3>📋 Your Tasks</h3>
        <span className="task-count">
          {pendingTasks.length} pending • {completedTasks.length} completed
        </span>
        {tasks.length > 0 && (
          <button 
            className="clear-all-btn"
            onClick={clearAllTasks}
            disabled={tasks.length === 0}
          >
            🗑️ Clear All
          </button>
        )}
      </div>

      <div className="task-list-scroll">
        {pendingTasks.length > 0 && (
          <>
            <div className="task-section-label">
              <span>📌 Pending Tasks</span>
              <span className="section-count">{pendingTasks.length}</span>
            </div>
            <ul className="task-list">
              {pendingTasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))}
            </ul>
          </>
        )}

        {completedTasks.length > 0 && (
          <>
            <div className="task-section-label completed-label">
              <span>✅ Completed Tasks</span>
              <span className="section-count">{completedTasks.length}</span>
            </div>
            <ul className="task-list">
              {completedTasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskList;