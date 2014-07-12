'use strict';

var passport = require('passport'),
 TwitterStrategy = require('passport-twitter').Strategy,
 config = require('./config');

passport.use(new TwitterStrategy({
    consumerKey: config.twitter.appKey,
    consumerSecret: config.twitter.appSecret,
    callbackURL: config.twitter.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    console.log('called back from twitter');
//    console.log(JSON.stringify(profile));

console.log('user is ' + profile.username);
console.log('name is ' + profile.displayName);
var    user = {};
user.id = profile.id;
user.name = profile.displayName;
done(null,user);
    //console.log(profile);
   // User.findOrCreate(..., function(err, user) {
   //   if (err) { return done(err); }
  //    done(null, user);
  //  });
  }
));


 var mongoose = require('mongoose'),
     User = mongoose.model('User');
//     passport = require('passport'),
//     LocalStrategy = require('passport-local').Strategy;

// /**
//  * Passport configuration
//  */
 passport.serializeUser(function(user, done) {
  console.log('serialize');
   done(null, user.id);
 });
 passport.deserializeUser(function(id, done) {
  console.log('deserialize');

  var user = {};
  user.name = 'foo';
  done(null,user);

   // User.findOne({
   //   _id: id
   // }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
   //   done(err, user);
   // });
 });

// // add other strategies for more authentication flexibility
// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password' // this is the virtual field on the model
//   },
//   function(email, password, done) {
//     User.findOne({
//       email: email.toLowerCase()
//     }, function(err, user) {
//       if (err) return done(err);
      
//       if (!user) {
//         return done(null, false, {
//           message: 'This email is not registered.'
//         });
//       }
//       if (!user.authenticate(password)) {
//         return done(null, false, {
//           message: 'This password is not correct.'
//         });
//       }
//       return done(null, user);
//     });
//   }
// ));

module.exports = passport;
