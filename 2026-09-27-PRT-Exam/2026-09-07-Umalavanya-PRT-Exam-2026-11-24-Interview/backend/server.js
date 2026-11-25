const express = require('express') ;
const mongoose = require('mongoose') ;
const cors = require('cors') ;
const dotenv = require('dotenv') ;
dotenv.config() ;

const bookRoutes = require('./routes/books') ;

const app = express() ;
app.use(cors()) ;
app.use(express.json()) ;


// MongoDb Connection
mongoose.connect(process.env.MONGODB_LINK)
        .then(() => {
            console.log('MongoDb connected!!!') ;
        })
        .catch((error) => console.log('MongoDb connection error happened!!', error))

app.use('/api/books', bookRoutes) ;

const PORT = process.env.PORT || 4320 ;
app.listen(PORT, ()=> {
    console.log(`Server running on http://localhost:${PORT}`) ;
})