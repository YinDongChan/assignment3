// Author: Yin Dong

// Date: July 12, 2020

// Course module: CPRG 210

// Assignment: Assignment #3

// import modules
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const moment = require("moment");
const destinations = require('./seeds/destinations');

// Models
const Destination = require('./models/gallery.js');

// Import seed data
const dbSeed = require('./seeds/destinations.js');

// Hide creds from repo
const mongoDB = process.env.MONGODB_URL;

// Set up default mongoose connection
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });

// Get the default connection
const db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set a callback to let us know we've successfully connected
db.once('open', function () {
  console.log('Connected to DB...');
});

// create express app
const app = express();
app.set('view engine', 'ejs');

app.locals.moment = moment;


// automatically check if requested file is found in /public
// if yes, return that file as a response to the browser
app.use(express.static(path.join(__dirname, 'public')));



// Display the login page
app.get('/', function (request, response) {
  response.render('index', {});
})

// Display the login page
app.get('/register', function (request, response) {
  response.render('register', {});
})

// Display the login page
app.get('/login', function (request, response) {
  response.render('login', {});
})

// Create a JSON (no EJS here) that returns the entire animal JSON
// This is the endpoint that the frontend gallery script calls (see: ./public/js/app.js).
app.get('/api/destinations', function (request, response) {
  Destination.find(function (error, destinations) {
    response.json(destinations);
  });
})
// console.log()
// Display an individual animal page when someone browses to an ID
// https://expressjs.com/en/api.html#req.params

// Define an endpoint handler for the individual destination pages
app.get('/:id', function (request, response) {
  Destination.findOne({ 'id': request.params.id }, function (error, destination) {

    // console.log('destination-single');

    // Check for IDs that are not in our list
    if (!destination) {
      return response.render('404', {});
    }
    // Compile view and respond
    response.render('destination-single', destination);
  });
})


// if no file or endpoint found, send a 404 error as a response to the browser
app.use(function (req, res, next) {
  res.status(404);
  res.render('404', {});
});

// start up server
const PORT = process.env.PORT || 3000;

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});

