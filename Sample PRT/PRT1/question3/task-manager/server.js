require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parses incoming JSON requests
app.use(cors()); // Allows cross-origin requests

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB successfully'))
    .catch((err) => console.error('MongoDB connection error:', err));


// API ROUTES

//POST api/tasks
app.post('/api/tasks', async (req, res) => {
    try {
        const { title, description, dueDate, category } = req.body;
        
        const newTask = new Task({
            title,
            description,
            dueDate,
            category
        });

        const savedTask = await newTask.save();
        res.status(201).json({ success: true, data: savedTask });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// GET /api/tasks

app.get('/api/tasks', async (req, res) => {
    try {
        const { category, completed, sort } = req.query;
        
        // Build query object
        let query = {};
        if (category) query.category = category;
        if (completed) query.completed = completed === 'true';

        // Build sort object (e.g., sort=dueDate or sort=-dueDate for descending)
        let sortBy = {};
        if (sort) sortBy[sort] = 1; 

        const tasks = await Task.find(query).sort(sortBy);
        res.status(200).json({ success: true, count: tasks.length, data: tasks });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// PUT /api/tasks/:id

app.put('/api/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true } // Return updated doc & validate schema
        );

        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// PATCH /api/tasks/:id/complete

app.patch('/api/tasks/:id/complete', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }

        task.completed = !task.completed; // Toggle status
        await task.save();

        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// DELETE /api/tasks/:id

app.delete('/api/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ success: false, error: 'Task not found' });
        }
        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Server Error' });
    }
});

// Global Error Handler for unhandled routes
app.use((req, res) => {
    res.status(404).json({ success: false, error: 'Route not found' });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});