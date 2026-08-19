import React from 'react';
import { useTasks } from '../context/TaskContext';
import '../styles/TaskStats.css';

const TaskStats = () => {
  const { getStats, tasks } = useTasks();
  const stats = getStats();

  if (tasks.length === 0) {
    return (
      <div className="task-stats">
        <p className="no-tasks">No tasks yet. Start by adding one below!</p>
      </div>
    );
  }

  return (
    <div className="task-stats">
      <div className="stat-item">
        <span className="stat-label">Total</span>
        <span className="stat-value" style={{ color: '#462C7D' }}>
          {stats.total}
        </span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Pending</span>
        <span className="stat-value" style={{ color: '#D552A3' }}>
          {stats.pending}
        </span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Completed</span>
        <span className="stat-value" style={{ color: '#5E244E' }}>
          {stats.completed}
        </span>
      </div>
    </div>
  );
};

export default TaskStats;