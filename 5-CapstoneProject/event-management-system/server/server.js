const express = require('express') ;
const http = require("http") ;
const cors = require('cors') ;
const bodyParser = require('body-parser') ;
const dotenv = require('dotenv') ;
const path = require('path') ;
const fs = require('fs') ;
// Setting up the database connection
const connectDB = require('./config/db') ;

// Initializing the express App
const app = express() ;

// Creating the Server
const server = http.createServer(app) ;

// middleware
const middleware = app.use(cors()) ;
app.use(bodyParser.json()) ;


// Connect the Database
connectDB() ;

// --Server Strat -----
const PORT = process.env.PORT || 4000 ;
server.listen(PORT, () => {
    console.log( `Server is running on the PORT: ${PORT}`) ;
})



