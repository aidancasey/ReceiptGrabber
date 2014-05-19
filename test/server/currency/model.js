'use strict';


var should = require('should'),
    mongoose = require('mongoose'),
    app = require('../../../server'),  //preload mongoose schema
    Currency = mongoose.model('Currency');

var currency;

describe('Currency Model', function() {
  before(function(done) {
    currency = new Currency({
      name: 'Sheckels',
      code: 'SHEK',
      id :1
    });

    // Clear users before testing
    Currency.remove().exec();
    done();
  });

  afterEach(function(done) {
    Currency.remove().exec();
    done();
  });

  it('should begin with no currencies loaded', function(done) {
    Currency.find({}, function(err, currencies) {
      currencies.should.have.length(0);
      done();
    });
  });

  it('should fail when saving a currency without a code', function(done) {
    currency.code = '';
    currency.save(function(err) {
      should.exist(err);
      done();
    });
  });

});