/* Author: Yin Dong

Date: July 12, 2020

Course module: CPRG 210

Assignment: Assignment #3  */

const mongoose = require('mongoose');

// Step 1: Define our Schema
const gallerySchema = new mongoose.Schema({
  id: Number,
  title: String,
  fileName: String,
  source: String,
  credit: String,
  url: String,
  detail: String
});

// Compile and export our model using the above Schema.
module.exports = mongoose.model('Destination', gallerySchema);

