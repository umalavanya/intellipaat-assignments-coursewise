const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

http.createServer((req, res) => {
    const url = req.url;
    
    // Route: /form - Show form
    if (url === '/form') {
        fs.readFile('./form.html', (err, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        });
    }
    
    // Route: /submit - Handle form submission
    else if (url === '/submit' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const parsedData = querystring.parse(body);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`
                <h2>Form Data Received:</h2>
                <p>Username: ${parsedData.username}</p>
                <p>Password: ${parsedData.password}</p>
                <a href="/form">Back to Form</a>
            `);
        });
    }
    
    // Route: /querystring - Display query string
    else if (url.startsWith('/querystring')) {
        const parsedUrl = new URL(url, `http://${req.headers.host}`);
        const queryData = parsedUrl.searchParams;
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <h2>Query String Data:</h2>
            <p>${queryData.toString() || 'No query string provided'}</p>
            <p><a href="/querystring?name=John&age=25">Try with query string</a></p>
            <a href="/form">Back to Form</a>
        `);
    }
    
    // Default route
    else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <h1>Welcome</h1>
            <a href="/form">Go to Form</a><br>
            <a href="/querystring">Go to Query String</a>
        `);
    }
}).listen(8080);

console.log('Server running at http://localhost:8080');