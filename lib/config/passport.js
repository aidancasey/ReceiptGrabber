'use strict';

var passport = require('passport'),
 TwitterStrategy = require('passport-twitter').Strategy,
 mongoose = require('mongoose'),
 User = mongoose.model('User'),
 config = require('./config');

passport.use(new TwitterStrategy({
    consumerKey: config.twitter.appKey,
    consumerSecret: config.twitter.appSecret,
    callbackURL: config.twitter.callbackURL
  },
  function(token, tokenSecret, profile, done) {
    console.log('called back from twitter');
    User.findOne({uid: profile.id}, function(err, user) {
      if(user) {
        done(null, user);
      } else {
        console.log('adding new user');
        var user = new User();
        user.provider = "twitter";
        user.uid = profile.id;
        user.displayName = profile.displayName;
        user.image = profile._json.profile_image_url;
        user.save(function(err) {
          if(err) { throw err; }
          done(null, user);
        });
      }
    })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.uid);
});

passport.deserializeUser(function(uid, done) {
  console.log('deserialize')
  User.findOne({uid: uid}, function (err, user) {
    done(err, user);
  });
});


module.exports = passport;
