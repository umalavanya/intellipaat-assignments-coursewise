import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { logout } from '../store/slices/authSlice';
import { setTasks, addTaskToState, toggleTaskInState, deleteTaskFromState } from '../store/slices/taskSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.task);
  const [newTask, setNewTask] = useState('');

  const authHeaders = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/auth/profile', authHeaders);
        dispatch(setTasks(res.data.tasks || []));
      } catch (err) {
        console.error(err);
      }
    };

    if (token) fetchTasks();
  }, [dispatch, token]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/auth/tasks', { text: newTask }, authHeaders);
      dispatch(addTaskToState(res.data.tasks));
      setNewTask('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/auth/tasks/${taskId}`, {}, authHeaders);
      dispatch(toggleTaskInState(res.data.tasks));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/auth/tasks/${taskId}`, authHeaders);
      dispatch(deleteTaskFromState(res.data.tasks));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div>
            <p className="welcome-text">Welcome</p>
            <h2>{user?.name}</h2>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        <form onSubmit={handleAddTask} className="task-form">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a task"
          />
          <button type="submit">Add</button>
        </form>

        <ul className="task-list">
          {tasks.length === 0 ? (
            <p className="empty-state">No tasks yet</p>
          ) : (
            tasks.map((task) => (
              <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                <div className="task-main">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleTask(task._id)}
                  />
                  <span>{task.text}</span>
                </div>
                <button className="delete-btn" onClick={() => handleDeleteTask(task._id)}>Delete</button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
