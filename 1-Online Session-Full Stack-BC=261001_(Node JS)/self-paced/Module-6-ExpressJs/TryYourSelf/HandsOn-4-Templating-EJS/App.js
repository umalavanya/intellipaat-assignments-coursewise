const express = require('express') ;
const app = express() ;


app.set('View Engine', 'ejs') ;
app.get('/', (req,res) => {

    res.render('index.ejs', {name:'Uma'})

})


app.listen(3000, () => {
    console.log("listening on Port 3000")
}) ;