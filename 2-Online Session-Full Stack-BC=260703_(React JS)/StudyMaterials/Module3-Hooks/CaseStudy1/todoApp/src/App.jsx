import { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';


function App() {
  // State to manage the list of todos
  const [todos, setTodos] = useState([]);

  // Function to add a new todo
  const addTodo = (taskText) => {
    const newTodo = {
      id: Math.random().toString(36).substr(2, 9), // Generate a random unique ID
      text: taskText,
      isCompleted: false,
    };
    setTodos([...todos, newTodo]);
  };

  // Function to remove a todo by its ID
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Function to toggle the completed state of a todo
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <div className="app-container">
      <h1>My To-Do List</h1>
      <TodoInput onAdd={addTodo} />
      <TodoList 
        todos={todos} 
        onRemove={removeTodo} 
        onToggle={toggleComplete} 
      />
    </div>
  );
}

export default App;