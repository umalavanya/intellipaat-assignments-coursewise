const express = require('express') ;
const app = express() ;


app.get('/', (req,res) =>{

    return res.end("Hello World!!") ;
}) ;


app.listen(3000, () => {
    console.log("listening on Port 3000")
}) ;