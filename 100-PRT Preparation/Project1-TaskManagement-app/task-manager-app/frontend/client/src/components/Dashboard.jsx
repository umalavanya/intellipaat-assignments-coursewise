import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';
import { getTasks, deleteTask, updateTask, reset } from '../store/taskSlice';
import TaskForm from './TaskForm';
import { 
  PlusCircle, 
  LogOut, 
  Edit, 
  Trash2, 
  CheckCircle, 
  Circle,
  ListChecks 
} from 'lucide-react';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { tasks, isLoading } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(getTasks());
    }
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  const handleToggleStatus = (task) => {
    const updatedTask = {
      ...task,
      status: task.status === 'pending' ? 'completed' : 'pending',
    };
    dispatch(updateTask({ id: task._id, taskData: updatedTask }));
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingTask(null);
  };

  return (
    <div className="container">
      <div className="header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <ListChecks size={28} color="#1a1a2e" />
          <h1>Task Manager</h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={{ color: '#666' }}>Welcome, {user?.name}</span>
          <button onClick={() => setShowForm(true)} style={{ background: '#1a1a2e' }}>
            <PlusCircle size={18} style={{ marginRight: '5px' }} />
            New Task
          </button>
          <button onClick={handleLogout} style={{ background: '#e94560' }}>
            <LogOut size={18} style={{ marginRight: '5px' }} />
            Logout
          </button>
        </div>
      </div>

      {isLoading && <div style={{ textAlign: 'center', padding: '20px' }}>Loading tasks...</div>}

      {tasks && tasks.length === 0 && !isLoading && (
        <div className="empty-state">
          <p>No tasks yet. Click "New Task" to create one!</p>
        </div>
      )}

      {tasks && tasks.map((task) => (
        <div key={task._id} className="task-card">
          <div className="task-content">
            <div className="task-title">{task.title}</div>
            <div className="task-description">{task.description}</div>
            <span className={`task-status ${task.status === 'completed' ? 'status-completed' : 'status-pending'}`}>
              {task.status}
            </span>
          </div>
          <div className="task-actions">
            <button 
              className="btn-toggle" 
              onClick={() => handleToggleStatus(task)}
              title={task.status === 'pending' ? 'Mark as completed' : 'Mark as pending'}
            >
              {task.status === 'pending' ? <CheckCircle size={18} /> : <Circle size={18} />}
            </button>
            <button className="btn-edit" onClick={() => openEditForm(task)}>
              <Edit size={18} />
            </button>
            <button className="btn-delete" onClick={() => handleDelete(task._id)}>
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}

      {showForm && (
        <TaskForm 
          taskToEdit={editingTask} 
          onClose={closeForm} 
        />
      )}
    </div>
  );
};

export default Dashboard;