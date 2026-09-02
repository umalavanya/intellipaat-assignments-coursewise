import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTasks, addTask, updateTask, deleteTask } from '../store/slices/taskSlice'
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react'
import './TaskList.css'

function TaskList() {
  const dispatch = useDispatch()
  const { items, loading } = useSelector(state => state.tasks)
  const [newTask, setNewTask] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  const handleAdd = (e) => {
    e.preventDefault()
    if (newTask.trim()) {
      dispatch(addTask(newTask.trim()))
      setNewTask('')
    }
  }

  const handleToggle = (task) => {
    dispatch(updateTask({
      id: task._id,
      data: { completed: !task.completed }
    }))
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this task?')) {
      dispatch(deleteTask(id))
    }
  }

  const handleEdit = (task) => {
    setEditingId(task._id)
    setEditText(task.description)
  }

  const handleSaveEdit = (id) => {
    if (editText.trim()) {
      dispatch(updateTask({
        id,
        data: { description: editText.trim() }
      }))
      setEditingId(null)
    }
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div>
      <form onSubmit={handleAdd} className="add-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
        />
        <button type="submit" className="btn-add">
          <Plus size={20} />
          <span>Add</span>
        </button>
      </form>

      <ul className="task-list">
        {items.map(task => (
          <li key={task._id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task)}
              className="task-checkbox"
            />

            {editingId === task._id ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="edit-input"
                  autoFocus
                />
                <button onClick={() => handleSaveEdit(task._id)} className="icon-btn save">
                  <Check size={18} />
                </button>
                <button onClick={() => setEditingId(null)} className="icon-btn cancel">
                  <X size={18} />
                </button>
              </div>
            ) : (
              <>
                <span className="task-text">{task.description}</span>
                <div className="task-actions">
                  <button onClick={() => handleEdit(task)} className="icon-btn edit">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(task._id)} className="icon-btn delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {items.length === 0 && !loading && (
        <p className="empty">No tasks yet. Add one above!</p>
      )}
    </div>
  )
}

export default TaskList