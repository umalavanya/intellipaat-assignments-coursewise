const express = require('express') ;
const app = express() ;


app.get('/', (req,res) =>{

    return res.end("Home Page") ;
}) ;

app.get('/about', (req,res) => {

    return res.end("About us page!")

}) ;


app.listen(3000, () => {
    console.log("listening on Port 3000")
}) ;