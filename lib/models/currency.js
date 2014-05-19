'use strict';
var mongoose = require('mongoose');

var currencySchema = new mongoose.Schema({
  name: { type: String},
  code: {type :String, required:true}
});

mongoose.model('Currency', currencySchema);