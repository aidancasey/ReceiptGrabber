'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Currency = mongoose.model('Currency');

/**
 * Populate database with reference data
 */


// Clear old users, then add a default user
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, function() {
      console.log('finished populating users');
    }
  );
});


// Clear old cureencies and add the reference data again
Currency.find({}).remove(function() {
  Currency.create({
   name : 'Euro',
    code : 'EUR'
  },{
    name : 'Aussie dollar',
    code : 'AUD'
  },
  {
    name : 'Sterling',
    code : 'GBP'
  },
  {
    name : 'Dirham',
    code : 'AED'
  },
  function() {
      console.log('finished populating currencies');
    }
  );
});


