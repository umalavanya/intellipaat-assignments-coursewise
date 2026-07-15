const http = require('http') ;
const fs = require('fs') ;
const querystring = require('querystring') ;


http.createServer((req, res) => {

    const url = req.url ;

    if(url === '/form') {
        fs.readFile('./form.html', (err,data) => {

            res.writeHead(200, {'Content-Type' : 'text/html'} ) ;
            res.end(data) ;

        })
    }



}).listen(8000) ;
console.log("Server is running on http://localhost:8000")