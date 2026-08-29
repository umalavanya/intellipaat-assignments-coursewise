const express = require('express') ;
const cors = require('cors') ;
const dotenv = require('dotenv') ;
const connectDB = require('./config/db.js') ;

dotenv.config() ;

connectDB().catch(err => {
    console.error('Failed to connect to MongoDB!',err) ;
    process.exit(1) ;
}
)
const app = express() ;
app.use(cors()) ;
app.use(express.json()) ;

app.get('/api/health',(req,res) => {
    res.status(200).json({
        message: "This is working fine!"
    })
})

app.get('/', (req,res) => {
    res.status(200).send("Task Manager API is running!!")
})

app.use((err, req,res, next) =>{
    console.error("Global Error", err) ;
    res.status(500).json({
        message: "SOmething went wrong!!!",
        error: err.message,
    })

})
const PORT=process.env.PORT || 5000 ;
app.listen(PORT,() => {
    console.log(`Server is running on PORT number ${PORT}!!`) ;
    console.log(`Test the server at: http://localhost:${PORT}/api/health`)
}) ;