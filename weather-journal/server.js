const express = require('express');
const cors = require('cors');

const app = express();

// Use CORS middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (form data)
app.use(express.urlencoded({ extended: true }));

// Initialize an empty object to hold project data
let projectData = {};

// Serve static files from the 'client' directory
app.use(express.static('client'));

// Handle POST requests to '/add'
app.post('/add', (req, res) => {
    projectData = req.body; // Store the incoming data in projectData
    console.log('Received data:', projectData);
    res.send({ message: 'Data received and added to projectData', data: projectData });
});

// Handle GET requests to '/all'
app.get('/all', (req, res) => {
    res.send(projectData); 
});

// Set the port for the server to listen on
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
