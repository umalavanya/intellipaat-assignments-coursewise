const express = require('express') ;
const cors = require('cors') ;


const app = express() ;

app.use(express.json());

app.use(cors()) ;

app.get('/api/test/', (res) =>{
    
    res.status(200).json('Working') ;
})

const PORT = 5000 ;
app.listen(PORT, console.log(`Server is running on port: ${PORT}`)) ;