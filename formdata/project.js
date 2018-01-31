let mongoose = require('mongoose');

module.exports = new mongoose.Schema({
  project: String,
  username: String,
  password: String,
})