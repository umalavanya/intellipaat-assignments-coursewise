import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTask, updateTask } from '../store/slices/taskSlice';
import { closeTaskModal, showToast } from '../store/slices/uiSlice';
import { X, Plus, Trash2, Calendar, Tag, Layers } from 'lucide-react';

const TaskFormModal = () => {
  const dispatch = useDispatch();
  const { isTaskModalOpen, editingTaskId } = useSelector((state) => state.ui);
  const { items } = useSelector((state) => state.tasks);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    category: 'General',
    dueDate: '',
    tagsString: '',
    subtasks: []
  });

  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  useEffect(() => {
    if (editingTaskId) {
      const taskToEdit = items.find((t) => t._id === editingTaskId);
      if (taskToEdit) {
        setFormData({
          title: taskToEdit.title || '',
          description: taskToEdit.description || '',
          status: taskToEdit.status || 'pending',
          priority: taskToEdit.priority || 'medium',
          category: taskToEdit.category || 'General',
          dueDate: taskToEdit.dueDate ? new Date(taskToEdit.dueDate).toISOString().split('T')[0] : '',
          tagsString: taskToEdit.tags ? taskToEdit.tags.join(', ') : '',
          subtasks: taskToEdit.subtasks ? [...taskToEdit.subtasks] : []
        });
      }
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'pending',
        priority: 'medium',
        category: 'General',
        dueDate: '',
        tagsString: '',
        subtasks: []
      });
    }
  }, [editingTaskId, items, isTaskModalOpen]);

  if (!isTaskModalOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddSubtask = () => {
    if (!newSubtaskTitle.trim()) return;
    setFormData({
      ...formData,
      subtasks: [...formData.subtasks, { title: newSubtaskTitle.trim(), completed: false }]
    });
    setNewSubtaskTitle('');
  };

  const handleRemoveSubtask = (index) => {
    const updated = formData.subtasks.filter((_, i) => i !== index);
    setFormData({ ...formData, subtasks: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      dispatch(showToast({ type: 'error', message: 'Task title is required' }));
      return;
    }

    const tagsArr = formData.tagsString
      ? formData.tagsString.split(',').map((t) => t.trim()).filter(Boolean)
      : [];

    const payload = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      priority: formData.priority,
      category: formData.category,
      dueDate: formData.dueDate || null,
      tags: tagsArr,
      subtasks: formData.subtasks
    };

    try {
      if (editingTaskId) {
        await dispatch(updateTask({ id: editingTaskId, taskData: payload })).unwrap();
        dispatch(showToast({ type: 'success', message: 'Task updated successfully!' }));
      } else {
        await dispatch(createTask(payload)).unwrap();
        dispatch(showToast({ type: 'success', message: 'New task created!' }));
      }
      dispatch(closeTaskModal());
    } catch (err) {
      dispatch(showToast({ type: 'error', message: err || 'Failed to save task' }));
    }
  };

  return (
    <div className="modal-overlay" onClick={() => dispatch(closeTaskModal())}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800 }}>
            {editingTaskId ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button onClick={() => dispatch(closeTaskModal())} className="btn-icon">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label className="form-label">Task Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Design Landing Page UI"
              className="input-field"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add key details or requirements..."
              className="input-field"
              rows={3}
              style={{ resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange} className="input-field">
                <option value="low" style={{ background: '#1e293b' }}>Low</option>
                <option value="medium" style={{ background: '#1e293b' }}>Medium</option>
                <option value="high" style={{ background: '#1e293b' }}>High</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="input-field">
                <option value="pending" style={{ background: '#1e293b' }}>Pending</option>
                <option value="in-progress" style={{ background: '#1e293b' }}>In Progress</option>
                <option value="completed" style={{ background: '#1e293b' }}>Completed</option>
              </select>
            </div>

          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            
            <div className="form-group">
              <label className="form-label">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="e.g. Work, Personal"
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="input-field"
              />
            </div>

          </div>

          <div className="form-group">
            <label className="form-label">Tags (comma separated)</label>
            <input
              type="text"
              name="tagsString"
              value={formData.tagsString}
              onChange={handleChange}
              placeholder="e.g. react, design, urgent"
              className="input-field"
            />
          </div>

          {/* Subtasks Builder */}
          <div className="form-group">
            <label className="form-label">Subtasks Checklist</label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input
                type="text"
                placeholder="Add subtask item..."
                value={newSubtaskTitle}
                onChange={(e) => setNewSubtaskTitle(e.target.value)}
                className="input-field"
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSubtask(); } }}
              />
              <button type="button" onClick={handleAddSubtask} className="btn btn-secondary">
                <Plus size={18} />
              </button>
            </div>

            {formData.subtasks.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
                {formData.subtasks.map((st, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '6px 10px', background: 'rgba(255, 255, 255, 0.04)', borderRadius: '6px' }}>
                    <span style={{ fontSize: '0.85rem' }}>{st.title}</span>
                    <button type="button" onClick={() => handleRemoveSubtask(i)} className="btn-icon" style={{ color: '#fb7185' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Submit Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button type="button" onClick={() => dispatch(closeTaskModal())} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingTaskId ? 'Save Changes' : 'Create Task'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default TaskFormModal;
