const Task = require('../models/Tasks');

const createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({
    user: req.user.id,
    title,
    description,
  });
  res.status(201).json(task);
};

const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  
  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedTask);
};

const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  
  if (task.user.toString() !== req.user.id) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  
  await task.deleteOne();
  res.json({ message: 'Task removed' });
};

module.exports = { createTask, getTasks, updateTask, deleteTask };