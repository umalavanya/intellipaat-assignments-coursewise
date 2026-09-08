const express = require('express') ;
const dotenv = require('dotenv') ;
const cors = require('cors') ;
const connectDB = require('./config/db') ;
dotenv.config() ;

const app = express() ;

app.use(cors()) ;
app.use(express.json()) ;

connectDB().catch(() => {
    console.log('MongoDB connection Error!! check lini8 in db.js'); 
})

app.use('/api/auth', require('./routes/authRoutes')) ;
app.use('/api/task', require('./routes/taskRoutes')) ;

app.get('/', (req,res) => {
    res.json({message: 'The server is working fine!!!'})
})

app.use((err, res, req, next) => {

    console.log(err.message) ;

})

const PORT = process.env.PORT ;
app.listen(PORT, () => {console.log(`The server is running on the PORT ${PORT}`)}) ;