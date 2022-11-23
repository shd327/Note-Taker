//Required imports
const express = require('express');
// const path = require('path');
const htmlRoute = require('./route/html');
// const apiRoute = require('./route/api');

//defining port
const port = process.env.PORT || 3001;
//creating express server instance and assigning it to a const called app
const app = express();


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', htmlRoute)
// app.use('/api', apiRoute)


//listener on port to handle traffic coming in and out
app.listen(port, () =>
    console.log(`App listening at http://localhost:${port} 🚀`)
);