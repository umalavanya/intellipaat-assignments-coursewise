const express = require('express') ;
const dotenv = require('dotenv') ;
const cors = require('cors') ;
const connectDB = require('./config/db') ;

dotenv.config() ;
connectDB().catch((err) => {
    console.error('Failed to connect to MongoDB:', err) ;
    process.exit(1) ;
}) ;
// ================================
const app = express() ;

// middleware
app.use(cors()) ;
app.use(express.json()) ;

// ===============================

// ================================
app.get('/test', (req,res) => {
    res.status(200).json({message: 'The server is working!!'})
}) ;
app.get('/', (req,res) => {
    res.status(200).json({message: 'Task Manager API is running'})
})

// Routes
app.use('/api/auth', require('./routes/authRoutes')) ;
app.use('/api/tasks', require('./routes/taskRoutes')) ;

// -----------------------


const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`The server is tunning on the PORT: ${PORT}`) ;
})