'use strict';

var api = require('./controllers/api'),
    file = require('./controllers/file'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    middleware = require('./middleware'),
    passport = require('./config/passport'),
    dropbox = require('./controllers/dropbox'),
    Q = require('q');

/**
 * Application routes
 */

module.exports = function(app) {



// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
app.get('/auth/twitter', passport.authenticate('twitter'));
// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.

 app.get('/auth/twitter/callback',passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req,res){
        // successful auth, user is set at req.user.  redirect as necessary.
        if (req.user.isNew) { return res.redirect('/signup?twitterAuth=true'); }
        res.redirect('/home');
    });

  app.route('/api/currency')
    .get(passport.ensureAuthenticated,api.currency);

  app.route('/dropbox/authorise')
    .get(passport.ensureAuthenticated,dropbox.authenticate);


   app.route('/api/foo')
        .get(
        function(req,res,next)
        {
             var result = dropbox.getDropboxProfileInfo('MDVDDbccNC8AAAAAAAABmshilclu4rr9wb1BkTGYD3ssoQlimRR-2S--GPccQ5b0')
             res.send(result);

        }
    );



    app.route('/api/dropbox/callback')
        .get(
        function(req,res,next)
        {
            dropbox.getBearerToken(req,res)
                   .then(function(finalValue){
                        dropbox.NoPromises(finalValue, function(value){
                        res.send('value ' + value);

                    })
                })
                .catch(function (error){
                    console.log(error);
                    res.send(error);
                })

        }
    );


    /* app.route('/api/dropbox/callback')
         .get(

                 function(req,res,next) {
                     try {
 //                         var x = dropbox.FooPromise(req, res);
 //                            x.then(function (result) {
 //                                res.send(result)
 //                            });

                         var x = dropbox.FooPromise(req, res);
                         x.then(dropbox.FooGetDropboxProfileInfo())
                             res.send(result)
                         });



                         FooGetDropboxProfileInfo

                     }
                     catch(ex)
                     {
                         console.log('ooooops');
                         console.log(ex)
                         res.send(ex);
                     }

                     *//*
                     dropbox.callback(req,res)
                     .then(function(result){
                     console.log(result);
                     res.send(result);
                     },function(error)
                     {
                     console.log('error occured');
                     res.send(error);
                     })
                     .done()*//*

 *//*                   Q.fcall(dropbox.callback(req,res))
                    //    .then(promisedStep2)
                    //    .then(promisedStep3)
                    //    .then(promisedStep4)
                        .then(function (result) {
                            res.send(result)
                        })
                        .catch(function (error) {
                            // Handle any error from all above steps
                            console.log(error);
                            res.send(error)
                        })
                        .done();*//*
                 }
           )*/

  app.route('/api/upload')
    .post(passport.ensureAuthenticated,file.upload);
    
//  app.route('/api/users')
//    .post(users.create)
//    .put(users.changePassword);
  app.route('/api/users/me')
    .get(passport.ensureAuthenticated,users.me);
  
//  app.route('/api/users/:id')
//    .get(users.show);

  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);

  app.route('/home')
      //make sure they are authenticated and set a cookie for the SPA to identify the user...
     .get(passport.ensureAuthenticated, middleware.setUserCookie, index.index);
   app.route('/*')
    .get( middleware.setUserCookie, index.index);
};