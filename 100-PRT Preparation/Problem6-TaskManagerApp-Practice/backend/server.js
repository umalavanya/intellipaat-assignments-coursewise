const express = require('express'); 
const dotenv = require('dotenv'); 
const cors = require('cors'); 
const connectDB = require('./config/db'); 
const mongoose = require('mongoose') ;

// Load environment variables
dotenv.config(); 

const app = express(); 

// Middleware 
app.use(cors()); 
app.use(express.json()); 

// Test route to check if server is working 
app.get('/api/test', (req, res) => { 
  res.json({ message: 'Server is running!' }); 
}); 

// Routes 
app.use('/api/auth', require('./routes/authRoutes')); 
app.use('/api/tasks', require('./routes/taskRoutes')); 

// Root route 
app.get('/', (req, res) => { 
  res.send('Task Manager API is running'); 
}); 

// Error handling middleware 
app.use((err, req, res, next) => { 
  console.error('Global error:', err); 
  res.status(500).json({ message: 'Something went wrong!', error: err.message }); 
}); 

const PORT = process.env.PORT || 5000; 

// Start DB first, then start server
const startServer = async () => {
  try {
    await connectDB();
    console.log('MongoDB connection established successfully.');

    app.listen(PORT, () => { 
      console.log(`Server running on port ${PORT}`); 
      console.log(`Test the server at: http://localhost:${PORT}/api/test`); 
    }); 
  } catch (err) {
    console.error('Failed to start server due to MongoDB connection error:', err); 
    process.exit(1); 
  }
  
};

startServer();
