const Task = require('../models/Task');

// Get all tasks
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ completed: 1, createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks', error: error.message });
  }
};

// Create a new task
exports.createTask = async (req, res) => {
  try {
    const { description } = req.body;
    if (!description) {
      return res.status(400).json({ message: 'Task description is required' });
    }
    
    const task = new Task({ description });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error creating task', error: error.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, completed } = req.body;
    
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;
    
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error: error.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error: error.message });
  }
};