'use strict';
var mongoose = require('mongoose');




var UserSchema = new mongoose.Schema({
  provider: String,
  uid: String,
  displayName: String,
  username: String,
  token: String,
  image: String,
  created: {type: Date, default: Date.now}
});

mongoose.model('User', UserSchema);

module.exports = mongoose.model('User', UserSchema);
