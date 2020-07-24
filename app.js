// import modules
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

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
