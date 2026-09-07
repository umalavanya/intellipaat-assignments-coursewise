import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateTask, deleteTask } from '../store/slices/taskSlice';
import { openEditTaskModal, showToast } from '../store/slices/uiSlice';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  Edit3,
  Trash2,
  Tag,
  CheckSquare
} from 'lucide-react';

const TaskCard = ({ task, viewMode = 'grid' }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleStatusChange = async (e) => {
    e.stopPropagation();
    const newStatus = e.target.value;
    try {
      await dispatch(updateTask({ id: task._id, taskData: { status: newStatus } })).unwrap();
      dispatch(showToast({ type: 'success', message: `Status updated to ${newStatus}` }));
    } catch (err) {
      dispatch(showToast({ type: 'error', message: 'Failed to update status' }));
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await dispatch(deleteTask(task._id)).unwrap();
        dispatch(showToast({ type: 'info', message: 'Task deleted successfully' }));
      } catch (err) {
        dispatch(showToast({ type: 'error', message: 'Failed to delete task' }));
      }
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    dispatch(openEditTaskModal(task._id));
  };

  const completedSubtasks = task.subtasks ? task.subtasks.filter(s => s.completed).length : 0;
  const totalSubtasks = task.subtasks ? task.subtasks.length : 0;

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getPriorityBadgeClass = (p) => {
    if (p === 'high') return 'badge-priority-high';
    if (p === 'medium') return 'badge-priority-medium';
    return 'badge-priority-low';
  };

  const getStatusBadgeClass = (s) => {
    if (s === 'completed') return 'badge-completed';
    if (s === 'in-progress') return 'badge-in-progress';
    return 'badge-pending';
  };

  return (
    <div
      className="glass-card"
      onClick={() => navigate(`/tasks/${task._id}`)}
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: viewMode === 'list' ? 'row' : 'column',
        alignItems: viewMode === 'list' ? 'center' : 'stretch',
        justifyContent: 'space-between',
        gap: '16px',
        cursor: 'pointer',
        position: 'relative'
      }}
    >
      {/* Top Header / Meta Info */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className={`badge ${getStatusBadgeClass(task.status)}`}>
              {task.status}
            </span>
            <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>
              {task.priority} priority
            </span>
          </div>

          <span style={{ fontSize: '0.78rem', color: 'var(--text-subdued)', fontWeight: 600 }}>
            {task.category || 'General'}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: '1.05rem',
          fontWeight: 700,
          color: task.status === 'completed' ? 'var(--text-muted)' : 'var(--text-main)',
          textDecoration: task.status === 'completed' ? 'line-through' : 'none',
          marginBottom: '8px'
        }}>
          {task.title}
        </h3>

        {/* Description Snippet */}
        {task.description && (
          <p style={{
            fontSize: '0.86rem',
            color: 'var(--text-muted)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            marginBottom: '14px'
          }}>
            {task.description}
          </p>
        )}

        {/* Subtask Progress & Tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
          {totalSubtasks > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <CheckSquare size={15} style={{ color: 'var(--accent-primary)' }} />
              <span>{completedSubtasks}/{totalSubtasks} subtasks</span>
            </div>
          )}

          {task.dueDate && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--amber-accent)' }}>
              <Calendar size={15} />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}

          {task.tags && task.tags.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Tag size={13} style={{ color: 'var(--text-subdued)' }} />
              {task.tags.map((t, idx) => (
                <span key={idx} style={{ fontSize: '0.72rem', color: 'var(--text-subdued)', background: 'rgba(255, 255, 255, 0.05)', padding: '2px 6px', borderRadius: '4px' }}>
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions & Quick Status Selector */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: viewMode === 'grid' ? '1px solid var(--bg-glass-border)' : 'none',
        paddingTop: viewMode === 'grid' ? '14px' : 0,
        marginTop: viewMode === 'grid' ? '12px' : 0,
        gap: '12px'
      }}>
        
        {/* Quick Status Dropdown */}
        <select
          value={task.status}
          onChange={handleStatusChange}
          onClick={(e) => e.stopPropagation()}
          className="input-field"
          style={{ width: 'auto', padding: '4px 8px', fontSize: '0.78rem', height: '32px' }}
        >
          <option value="pending" style={{ background: '#1e293b' }}>Pending</option>
          <option value="in-progress" style={{ background: '#1e293b' }}>In Progress</option>
          <option value="completed" style={{ background: '#1e293b' }}>Completed</option>
        </select>

        {/* Edit & Delete Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button onClick={handleEdit} className="btn-icon" title="Edit Task">
            <Edit3 size={16} />
          </button>
          <button onClick={handleDelete} className="btn-icon" title="Delete Task" style={{ color: '#fb7185' }}>
            <Trash2 size={16} />
          </button>
        </div>

      </div>

    </div>
  );
};

export default TaskCard;
