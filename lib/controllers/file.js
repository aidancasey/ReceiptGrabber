'use strict';

var mongoose = require('mongoose');
var fs = require('fs');

/**
 * Post File Stream
 */


exports.upload = function(req, res) {
 req.pipe(req.busboy);
 req.busboy.on('file', function(fieldname, file, filename) {
  	console.log(filename);
    var fstream = fs.createWriteStream('./public/uploads/' + filename); 
    file.pipe(fstream);
    fstream.on('close', function () {
    res.send('back');});

  });
};