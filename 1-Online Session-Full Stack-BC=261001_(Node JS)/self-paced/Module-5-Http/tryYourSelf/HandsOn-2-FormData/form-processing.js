const http = require('http');
const fs = require('fs');

http.createServer((req,res) => {
    if(req.method == "POST"){
        let body = "";
        req.on('data', data =>{
            body += data.toString();
        });
        req.on('end', () =>{
            console.log(body);
            res.end('ok');
        });
    } else {
        fs.readFile('./form-processing.html',(err,data) =>{
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(data);
        });
    }
}).listen(3030);