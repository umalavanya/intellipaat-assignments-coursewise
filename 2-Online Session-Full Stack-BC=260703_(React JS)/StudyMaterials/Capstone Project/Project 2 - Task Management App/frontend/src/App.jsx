import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskStats from './components/TaskStats';
import './styles/App.css';

function App() {
  return (
    <TaskProvider>
      <div className="app-container">
        <h1>✅ Task Management Tool</h1>
        <TaskStats />
        <TaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;