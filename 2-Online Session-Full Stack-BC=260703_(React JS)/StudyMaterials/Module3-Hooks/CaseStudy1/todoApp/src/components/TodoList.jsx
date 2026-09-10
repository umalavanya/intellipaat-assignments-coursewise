function TodoList({ todos, onRemove, onToggle }) {
  if (todos.length === 0) {
    return <p className="empty-message">No tasks yet. Add one above!</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li 
          key={todo.id} 
          className={`todo-item ${todo.isCompleted ? 'completed' : ''}`}
        >
          {/* Clicking the text toggles completion */}
          <span 
            className="todo-text" 
            onClick={() => onToggle(todo.id)}
          >
            {todo.text}
          </span>
          
          {/* Remove button */}
          <button 
            className="remove-btn" 
            onClick={() => onRemove(todo.id)}
          >
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;