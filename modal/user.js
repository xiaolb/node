let mongoose = require('mongoose');

let userSchema = require('../formdata/user');

let User = mongoose.model('user', userSchema);

 module.exports = User;