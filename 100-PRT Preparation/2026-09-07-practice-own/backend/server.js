const express = require('express') ;
const dotenv =  require('dotenv') ;
const cors = require('cors') ;
const connectDB = require('./config/db')

dotenv.config() ;

connectDB().catch(error =>{
    console.log("The mongoDB is not connected") ;
}) ;

// app  =============
const app = express() ;

// middleware ============
app.use(cors()) ;
app.use(express.json()) ;

// Routes are here---

app.use('/api/auth', require('./routes/authRoutes')) ;
app.use('/api/tasks', require('./routes/taskRoutes')) ;
// -----------------------------

// api end point ==============
app.get('/',(req,res) => {
    res.json({message: "the server is working!!"})
})

// server starting...
PORT = process.env.PORT ;
app.listen(PORT, console.log(`The server is running on the PORT ${PORT}`)) ;