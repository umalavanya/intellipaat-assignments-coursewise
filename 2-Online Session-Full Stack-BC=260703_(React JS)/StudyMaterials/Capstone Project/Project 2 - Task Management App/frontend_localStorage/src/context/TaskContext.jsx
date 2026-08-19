import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Context
const TaskContext = createContext();

// Custom hook to use TaskContext
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

// Task Provider Component
export const TaskProvider = ({ children }) => {
  // Initialize state with function to load from localStorage
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        // Ensure tasks is always an array
        return Array.isArray(parsedTasks) ? parsedTasks : [];
      }
      return [];
    } catch (err) {
      console.error('Error loading tasks from localStorage:', err);
      return [];
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (err) {
      console.error('Error saving tasks to localStorage:', err);
    }
  }, [tasks]);

  // Add a new task
  const addTask = (description) => {
    if (!description.trim()) {
      setError('Task description cannot be empty');
      return false;
    }

    const newTask = {
      id: Date.now().toString(),
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setTasks(prevTasks => [newTask, ...prevTasks]);
    setError(null);
    return true;
  };

  // Edit an existing task
  const editTask = (id, newDescription) => {
    if (!newDescription.trim()) {
      setError('Task description cannot be empty');
      return false;
    }

    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { 
              ...task, 
              description: newDescription.trim(),
              updatedAt: new Date().toISOString()
            } 
          : task
      )
    );
    setError(null);
    return true;
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    setError(null);
  };

  // Toggle task completion status
  const toggleComplete = (id) => {
    setTasks(prevTasks => {
      // First, toggle the task's completed status
      const toggledTasks = prevTasks.map(task => 
        task.id === id 
          ? { ...task, completed: !task.completed, updatedAt: new Date().toISOString() }
          : task
      );

      // Then, sort tasks: pending first, completed last
      const pendingTasks = toggledTasks.filter(task => !task.completed);
      const completedTasks = toggledTasks.filter(task => task.completed);
      
      // Return the reordered array
      return [...pendingTasks, ...completedTasks];
    });
    setError(null);
  };

  // Clear all tasks
  const clearAllTasks = () => {
    if (tasks.length === 0) return;
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      setTasks([]);
      setError(null);
    }
  };

  // Get task statistics
  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  };

  const value = {
    tasks,
    loading,
    error,
    setError,
    addTask,
    editTask,
    deleteTask,
    toggleComplete,
    clearAllTasks,
    getStats
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};