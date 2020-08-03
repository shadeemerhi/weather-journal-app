// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');
const { userInfo } = require('os');
/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//Here we are configuring express to use body-parser as middle-ware.
// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

const port = 4000;
const server = app.listen(port, listening);

function listening () {
    console.log('server running');
    console.log(`running on local host: ${port}`);
}

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
// Callback to debug

// Initialize all route with a callback function
app.get('/all', sendData);

// Callback function to complete GET '/all'
function sendData (request, response) {
    response.send(projectData);
}

// Post Route
app.post('/addData', addData);

function addData(request, response) {
    let newEntry = {
        temperature: request.body.temperature,
        date: request.body.date,
        userResponse: request.body.userResponse
    }
    projectData.push(newEntry);
}