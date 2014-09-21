'use strict';

var crypto = require('crypto'),
    url = require('url'),
    request = require('request'),
    Dropbox = require("dropbox"),
    fs = require("fs"),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Q = require('q'),
   Promise = require('promise');



var config = require('../../lib/config/config');
var APP_KEY = config.dropbox.appKey;
var APP_SECRET = config.dropbox.appSecret;


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



exports.NoPromises= function(bearerToken,callback)
{
    console.log(bearerToken);
    var dropboxClient = new Dropbox.Client({
        key: APP_KEY,
        secret: APP_SECRET,
        token: bearerToken
    });
    dropboxClient.getAccountInfo(function (error, accountInfo) {
        if (error) {
            console.log('we had an error')
            callback(error);
        }
        else
        {
            console.log('all dandy');
            console.log(accountInfo);
            callback(accountInfo.name);
        }
    })
}




exports.getDropboxProfileInfo= function (bearerToken) {

    console.log('getDropboxProfileInfo ' + bearerToken);
    var deferred = Q.defer();

    var dropboxClient = new Dropbox.Client({
        key: APP_KEY,
        secret: APP_SECRET,
        token: bearerToken
    });


    Q.fcall(dropboxClient.getAccountInfo, function (error, accountInfo)
    {
        console.log('MAKING CALL TO GET ACCOUNT INFO');
        if (error) {
            console.log (error)
            deferred.reject(error);
        } else {
            console.log('got acct info');
            deferred.resolve(accountInfo);
        }
    })
        .done();

    return deferred.promise;
}

   /* Q.fcall(dropboxClient.getAccountInfo, function (error, accountInfo)
    {
        console.log('MAKING CALL TO GET ACCOUNT INFO');
        if (error) {
            console.log (error)
            deferred.reject(error);
        } else {
            console.log('got acct info');
            deferred.resolve(accountInfo);
        }
    })
        .done();
    return deferred.promise;
}*/



/*function storeBearerToken(token,req,res) {
    var deferred = Q.defer();
    var accountInfo = getProfileDetails(token);

    //need to chain these together - account info needs to be populated before we go further..

    var userId = req.user._id;
    User.findOne({_id: userId}, function (err, currentUser) {
        if (currentUser) {
            currentUser.dropboxId = accountInfo.uid;
            currentUser.dropboxName = accountInfo.name;
            currentUser.dropboxEmail = accountInfo.email;
            currentUser.dropboxBearerToken = token;
            currentUser.save(function (err) {
                if (err)
                    console.log('error')
                else
                    console.log('success')
                //    console.log(currentUser);
            });

        }
        else {
            console.log('no find user!')
        }
    })
};*/

exports.authenticate = function (req, res) {
    console.log('authenticating with dropbox...');
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



exports.getBearerToken  = function (req,res) {

 console.log('in the callback');
    var deferred = Q.defer();

      if (req.query.error) {
          deferred.resolve(req.query.error);
      }

    Q.fcall(request.post,'https://api.dropbox.com/1/oauth2/token', {
                form: {
                    code: req.query.code,
                    grant_type: 'authorization_code',
                    redirect_uri: generateRedirectURI(req)
                },
                auth: {
                    user: APP_KEY,
                    pass: APP_SECRET
                }}, function (error, response, body)
    {
        if (error) {
            console.log (error)
            deferred.reject(error);
        } else {
            console.log('made it here before blowing up');
            var data = JSON.parse(body);
            if (data.error) {
                deferred.reject(data.error);
            }
            deferred.resolve(data.access_token);
           }
    })
    .done();
    console.log('all done');
    return deferred.promise;
}





exports.Function1  = function (value) {
    var deferred = Q.defer();
    var result =  value + '|QQQQQQQQQQQ|  ' ;
    deferred.resolve(result);
    return deferred.promise;
}








/*exports.callback1 = function (req, res) {


    //get bearer token
    //then save bearer token


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

        storeBearerToken(token,req,res)
        res.send('all good');


        *//*		fs.readFile("./public/uploads/google.jpg", function(error, data) {
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
         });*//*
        //});
    });

    }*/


