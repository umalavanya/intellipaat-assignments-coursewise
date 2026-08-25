import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, updateTask, reset } from '../store/taskSlice';

const TaskForm = ({ taskToEdit, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
  });

  const { title, description, status } = formData;
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        status: taskToEdit.status || 'pending',
      });
    }
  }, [taskToEdit]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description) {
      alert('Please fill all fields');
      return;
    }

    try {
      if (taskToEdit) {
        await dispatch(updateTask({ id: taskToEdit._id, taskData: formData })).unwrap();
      } else {
        await dispatch(createTask(formData)).unwrap();
      }

      setFormData({ title: '', description: '', status: 'pending' });
      onClose();
      dispatch(reset());
    } catch {
      // Keep the form open so the error message remains visible.
    }
  };

  return (
    <div className="task-form-modal" onClick={onClose}>
      <div className="task-form-content" onClick={(e) => e.stopPropagation()}>
        <h2>{taskToEdit ? 'Edit Task' : 'Create New Task'}</h2>
        {isError && <div className="error">{message}</div>}
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={onChange}
              required
              placeholder="Enter task title"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={description}
              onChange={onChange}
              required
              placeholder="Enter task description"
            />
          </div>
          {taskToEdit && (
            <div className="form-group">
              <label>Status</label>
              <select name="status" value={status} onChange={onChange}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          )}
          <div className="form-actions">
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : taskToEdit ? 'Update' : 'Create'}
            </button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;