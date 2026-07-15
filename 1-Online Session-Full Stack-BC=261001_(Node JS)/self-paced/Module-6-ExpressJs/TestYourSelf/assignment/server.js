const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON data (optional)
app.use(express.json());


// Serve the form at the root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});


// GET route to serve the form
app.get('/form', (req, res) => {
    // Send the HTML file
    res.sendFile(path.join(__dirname, 'form.html'));
});

// POST route to handle form submission
app.post('/form', (req, res) => {
    // Extract form data from the request body
    const formData = req.body;
    
    // Log the form data to the console
    console.log('=== Form Data Received ===');
    console.log('Full Data:', formData);
    console.log('Name:', formData.name);
    console.log('Email:', formData.email);
    console.log('Message:', formData.message);
    console.log('===========================');
    
    // Send a response back to the client
    res.send(`
        <h1>Form Submitted Successfully!</h1>
        <p>Thank you, ${formData.name || 'User'}!</p>
        <p>Your message has been received.</p>
        <a href="/form">Submit another response</a>
    `);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`Access the form at http://localhost:${port}/form`);
});