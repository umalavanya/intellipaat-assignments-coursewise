import { useState } from 'react';

function TodoInput({ onAdd }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (!inputValue.trim()) return; // Don't add empty tasks
    
    onAdd(inputValue);
    setInputValue(''); // Clear input after adding
  };

  return (
    <form className="todo-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="todo-input"
      />
      <button type="submit" className="add-btn">Add</button>
    </form>
  );
}

export default TodoInput;