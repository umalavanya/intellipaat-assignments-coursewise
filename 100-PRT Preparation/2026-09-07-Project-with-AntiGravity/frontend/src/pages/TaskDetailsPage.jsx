import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTaskById, updateTask, deleteTask, clearCurrentTask } from '../store/slices/taskSlice';
import { openEditTaskModal, showToast } from '../store/slices/uiSlice';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TaskFormModal from '../components/TaskFormModal';
import {
  ArrowLeft,
  Calendar,
  CheckSquare,
  Clock,
  Edit3,
  Trash2,
  Tag,
  CheckCircle2,
  Flame,
  AlertCircle
} from 'lucide-react';

const TaskDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentTask, isLoading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTaskById(id));
    return () => {
      dispatch(clearCurrentTask());
    };
  }, [id, dispatch]);

  const handleToggleSubtask = async (index) => {
    if (!currentTask) return;
    const updatedSubtasks = currentTask.subtasks.map((st, i) =>
      i === index ? { ...st, completed: !st.completed } : st
    );
    try {
      await dispatch(updateTask({ id: currentTask._id, taskData: { subtasks: updatedSubtasks } })).unwrap();
      dispatch(showToast({ type: 'success', message: 'Subtask updated' }));
    } catch (err) {
      dispatch(showToast({ type: 'error', message: 'Failed to update subtask' }));
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    try {
      await dispatch(updateTask({ id: currentTask._id, taskData: { status: newStatus } })).unwrap();
      dispatch(showToast({ type: 'success', message: `Status updated to ${newStatus}` }));
    } catch (err) {
      dispatch(showToast({ type: 'error', message: 'Failed to update status' }));
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await dispatch(deleteTask(currentTask._id)).unwrap();
        dispatch(showToast({ type: 'info', message: 'Task deleted' }));
        navigate('/');
      } catch (err) {
        dispatch(showToast({ type: 'error', message: 'Failed to delete task' }));
      }
    }
  };

  if (isLoading || !currentTask) {
    return (
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <div className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh' }}>
            <p style={{ color: 'var(--text-muted)' }}>Loading task details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />

        <main className="page-wrapper" style={{ maxWidth: '900px' }}>
          
          {/* Back Button */}
          <button
            onClick={() => navigate('/')}
            className="btn btn-secondary"
            style={{ marginBottom: '24px', fontSize: '0.85rem' }}
          >
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </button>

          {/* Main Card Container */}
          <div className="glass-panel" style={{ padding: '32px' }}>
            
            {/* Meta badges & Category */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className={`badge badge-${currentTask.status}`}>
                  {currentTask.status}
                </span>
                <span className={`badge badge-priority-${currentTask.priority}`}>
                  {currentTask.priority} priority
                </span>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-subdued)', fontWeight: 600 }}>
                  Category: {currentTask.category || 'General'}
                </span>
              </div>

              {/* Status Switcher Dropdown */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Status:</span>
                <select
                  value={currentTask.status}
                  onChange={handleStatusChange}
                  className="input-field"
                  style={{ width: 'auto', padding: '4px 10px', fontSize: '0.82rem', height: '34px' }}
                >
                  <option value="pending" style={{ background: '#1e293b' }}>Pending</option>
                  <option value="in-progress" style={{ background: '#1e293b' }}>In Progress</option>
                  <option value="completed" style={{ background: '#1e293b' }}>Completed</option>
                </select>
              </div>
            </div>

            {/* Title */}
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px', lineHeight: 1.3 }}>
              {currentTask.title}
            </h1>

            {/* Description */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--bg-glass-border)',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '28px'
            }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Description
              </h4>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', whitespace: 'pre-wrap' }}>
                {currentTask.description || 'No detailed description provided.'}
              </p>
            </div>

            {/* Subtasks Checklist */}
            <div style={{ marginBottom: '28px' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckSquare size={18} style={{ color: 'var(--accent-primary)' }} />
                Subtasks Checklist
              </h4>

              {currentTask.subtasks && currentTask.subtasks.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {currentTask.subtasks.map((st, i) => (
                    <div
                      key={i}
                      onClick={() => handleToggleSubtask(i)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        background: 'rgba(255, 255, 255, 0.04)',
                        border: '1px solid var(--bg-glass-border)',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)'
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={st.completed}
                        onChange={() => {}} // handled by div onClick
                        style={{ accentColor: 'var(--accent-primary)', width: '18px', height: '18px' }}
                      />
                      <span style={{
                        fontSize: '0.92rem',
                        textDecoration: st.completed ? 'line-through' : 'none',
                        color: st.completed ? 'var(--text-muted)' : 'var(--text-main)'
                      }}>
                        {st.title}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '0.85rem', color: 'var(--text-subdued)' }}>No subtasks added.</p>
              )}
            </div>

            {/* Dates & Tags Footer */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingTop: '20px',
              borderTop: '1px solid var(--bg-glass-border)',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {currentTask.dueDate && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--amber-accent)' }}>
                    <Calendar size={16} />
                    <span>Due: {new Date(currentTask.dueDate).toLocaleDateString()}</span>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--text-subdued)' }}>
                  <Clock size={16} />
                  <span>Created: {new Date(currentTask.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Edit & Delete Action Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={() => dispatch(openEditTaskModal(currentTask._id))}
                  className="btn btn-secondary"
                >
                  <Edit3 size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="btn btn-danger"
                >
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>

          </div>

        </main>
      </div>

      <TaskFormModal />
    </div>
  );
};

export default TaskDetailsPage;
