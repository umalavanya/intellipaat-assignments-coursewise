const express = require('express') ;
const cors = require('cors') ;
const dotenv = require('dotenv') ;
const connectDB=require('./config/db')

dotenv.config() ;

connectDB().catch(err => {
    console.error(`Failed to connect to mongoDB: `, err) ;
    process.exit(1) ;
}) ;
const app = express() ;


app.use(cors()) ;
app.use(express.json()) ;

app.get('/', (req,res) => {
    res.status(200).json({message: "Its working!!"})

}) ;

app.get('/health', (req,res) => {
    res.status(200).json({message: "the jealth API is working!!"})

}) ;

app.use((err,req,res,next) => {
    console.error('Global error:', err) ;
    res.status(500).json({
        message: 'Something went wrong!!',
        error: err.message
    })

})

const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`The server is running on the PORT: ${PORT}`) ;
})
