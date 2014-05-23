'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app, upload, express) {

  // Server API Routes

  app.route('/api/currency')
    .get(api.currency);
    
  app.route('/api/users')
    .post(users.create)
    .put(users.changePassword);
  app.route('/api/users/me')
    .get(users.me);
  app.route('/api/users/:id')
    .get(users.show);

  // app.route('/api/file')
  //   .all(function(req,res,next){
  //     upload.fileHandler();
  //   });


  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });



        // // events
        // upload.on('begin', function (fileInfo) { 
        //   console.log('begin');
        // });
        //  upload.on('abort', function (fileInfo) { console.log('abort'); });
        //  upload.on('end', function (fileInfo) { console.log('end'); });
        //  upload.on('delete', function (fileInfo) { console.log('delete'); });
        // upload.on('error', function (e) {
        //     console.log(e.message);
        // });
 
  //aidan hacking at file uploads to view em



 app.use("/uploads/*", express.static(__dirname + '/public/uploads'));


  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
 

 app.route('/index')
   .get( middleware.setUserCookie, index.fileupload);

// app.route('/*')
//   .get( middleware.setUserCookie, index.fileupload);
};