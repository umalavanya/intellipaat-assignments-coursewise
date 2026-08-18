const express =  require('express') ;
const mongoose = require('mongoose') ;
const cors = require('cors') ;
require('dotenv').config() ;

const app = express() ;
const PORT = process.env.PORT || 5000 ;

// MIDDLEWARE
app.use(cors()) ;
app.use(express.json()) ;
app.use(express.urlencoded({extended : true})) ; 

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true ,
    useUnifiedtopology: true ,
})
.then(() => {
    console.log('Connected to MongoDB successfully!!')
})
.catch((err) => {
    console.error('MongoDB Connection Error: ',err) ;
    process.exit(1) ;

})



//TEST: Add this middleware to see if server works
app.use((req,res,next) => {

    console.log(`${req.method} ${req.url}`) ;
    next() ;

}) ;

// Test Route
app.get('/test', (req,res) => {
    res.json({message: 'Server is working!' }) ;
}) ;


// Start server
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`) ;
    console.log(`Test: http://localhost:${PORT}/test`)
}) ;