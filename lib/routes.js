'use strict';

var api = require('./controllers/api'),
    file = require('./controllers/file'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    middleware = require('./middleware'),
    passport = require('./config/passport'),
    dropbox = require('./controllers/dropbox');

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
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { successRedirect: '/home',
                                     failureRedirect: '/login' }));

  app.route('/api/currency')
    .get(passport.ensureAuthenticated,api.currency);

  app.route('/api/dropbox/authorise')
    .get(passport.ensureAuthenticated,dropbox.authenticate);

  app.route('/api/dropbox/callback111')

      //get a bearer token from dropbox and store it with the user data

    .get(passport.ensureAuthenticated,dropbox.callback);

    app.route('/api/dropbox/callback')
        .get(
                function(req,res,next)
                {
                //    passport.ensureAuthenticated(req,res,next);
                    dropbox.callback(req,res)
                    .then(function(result){
                        console.log(result);
                        res.send(result);
                    },function(error)
                    {
                        console.log('error occured');
                        res.send(error);
                    })
                    .done();
                }
            )


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