const express = require('express') ;
const cors = require('cors') ;
const dotenv = require('dotenv') ;
const connectDB = require('./config/db') ;

dotenv.config() ;  //Configuring dotenv

connectDB().catch(console.log('Error in connecting mongoDB!!'))
// express app
const app = express() ;

// middleware
app.use(express.json()) ;
app.use(cors()) ;

// Server checking at http://localhost:4000/
app.get('/health', (req,res) => {
    res.json({message:'The server is working!!'}) ;
}) ;
const PORT = process.env.PORT ;
app.listen(PORT, console.log(`The server is working on PORT: ${PORT}  --> http://localhost:${PORT}/health`)) ;