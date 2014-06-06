'use strict';

var dboxAPI  = require("dbox");
var crypto = require('crypto');
var url = require('url');
var request = require('request');
var Dropbox = require("dropbox");
var fs = require("fs");

/**
 * Get Currency Collection
 */

// insert your app key and secret here
var APP_KEY = 'tjaiz4zba7u6ebp';
var APP_SECRET = '7xdchmi43v1nnas';



function generateCSRFToken() {
	return crypto.randomBytes(18).toString('base64')
		.replace(/\//g, '-').replace(/\+/g, '_');
}

function generateRedirectURI(req) {
	return url.format({
			protocol: req.protocol,
			host: req.headers.host,
			pathname: req.app.path() + '/api/dropbox/callback'
	});
}

exports.authenticate = function(req, res) {
var csrfToken = generateCSRFToken();
	res.cookie('csrf', csrfToken);
	res.redirect(url.format({
		protocol: 'https',
		hostname: 'www.dropbox.com',
		pathname: '1/oauth2/authorize',
		query: {
			client_id: APP_KEY,
			response_type: 'code',
			state: csrfToken,
			redirect_uri: generateRedirectURI(req)
		}
	}));
};

exports.callback = function(req, res) {
if (req.query.error) {
		return res.send('ERROR ' + req.query.error + ': ' + req.query.error_description);
	}

	// check CSRF token
	if (req.query.state !== req.cookies.csrf) {
		return res.status(401).send(
			'CSRF token mismatch, possible cross-site request forgery attempt.'
		);
	}
	// exchange access code for bearer token
	request.post('https://api.dropbox.com/1/oauth2/token', {
		form: {
			code: req.query.code,
			grant_type: 'authorization_code',
			redirect_uri: generateRedirectURI(req)
		},
		auth: {
			user: APP_KEY,
			pass: APP_SECRET
		}
	}, function (error, response, body) {
		var data = JSON.parse(body);

		if (data.error) {
			return res.send('ERROR: ' + data.error);
		}

		// extract bearer token
		var token = data.access_token;

		console.log('bearer token value is ');
		console.log(token);



		var client = new Dropbox.Client({
				    key: APP_KEY,
				    secret: APP_SECRET,
				    token :token
					});

		console.log('pre foo');
		client.getAccountInfo(function(error, accountInfo) {
	  	if (error) {
	  		console.log('error');
    		console.log(error);  // Something went wrong.
    		res.send(error);
  		}

  		console.log('foo');
	  	console.log(accountInfo);

       
		fs.readFile("./public/uploads/google.jpg", function(error, data) {
		  // No encoding passed, readFile produces a Buffer instance
		  if (error) {
		  	console.log(error);
		    return res.send(error);
		  }
		  client.writeFile("google.png", data, function(error, stat) {
		    if (error) {
		     	console.log(error);
		    	return res.send(error);
		    }
		    // The image has been succesfully written.
		    res.send('think a file is now in dropbox!');
		  });
		});
		});
	});
};




