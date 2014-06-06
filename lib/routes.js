'use strict';

var api = require('./controllers/api'),
    file = require('./controllers/file'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    middleware = require('./middleware'),
    dropbox = require('./controllers/dropbox');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes

  app.route('/api/currency')
    .get(api.currency);


  app.route('/api/dropbox/authenticate')
    .get(dropbox.authenticate);

  app.route('/api/dropbox/callback')
    .get(dropbox.callback);


  app.route('/api/upload')
    .post(file.upload);
    
  app.route('/api/users')
    .post(users.create)
    .put(users.changePassword);
  app.route('/api/users/me')
    .get(users.me);
  app.route('/api/users/:id')
    .get(users.show);

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
  app.route('/*')
    .get( middleware.setUserCookie, index.index);
};