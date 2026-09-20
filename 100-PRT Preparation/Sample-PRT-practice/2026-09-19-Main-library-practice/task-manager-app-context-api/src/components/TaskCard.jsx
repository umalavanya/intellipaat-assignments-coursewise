import { useAuth } from '../context/AuthContext';

export default function TaskCard({ task }) {
  const { toggleTask, deleteTask } = useAuth();

  return (
    <div className={`task-card ${task.done ? 'done' : ''}`}>
      <span>{task.text}</span>
      <div className="task-actions">
        <button className="btn-done" onClick={() => toggleTask(task.id)}>
          {task.done ? 'Undo' : 'Done'}
        </button>
        <button className="btn-delete" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}