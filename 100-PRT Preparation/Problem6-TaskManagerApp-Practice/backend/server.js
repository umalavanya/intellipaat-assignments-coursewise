const express = require('express') ;
const cors = require('cors') ;
const dotenv = require('dotenv') ;
const connectDB = require('./config/db')

const app = express() ;

dotenv.config() ;

connectDB() ;

app.use(cors()) ;
app.use(express.json()) ;


app.get('/api/check', (req,res) => {
    res.status(200).json({message: 'Its working!!!'}) ;
})

PORT=process.env.PORT || 4000 ;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}......`) ;
    console.log(`http://localhost:${PORT}`);
    console.log(`health check is at: http://localhost:${PORT}/api/check`);
}) ;