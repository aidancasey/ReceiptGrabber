'use strict';

var mongoose = require('mongoose');

/**
 * Get Currency Collection
 */

exports.currency = function(req, res) {
  var Currency = mongoose.model('Currency');
  return Currency.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};

