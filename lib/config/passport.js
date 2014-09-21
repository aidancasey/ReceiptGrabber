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
    function (token, tokenSecret, profile, done) {
        console.log('called back from twitter');
        User.findOne({uid: profile.id}, function (err, user) {
            if (user) {
                console.log('user is ' + user.id);
                user.isNew = false;
                done(null, user);
            }
            else {
            //else if (profile.id == 522142801) {
                console.log('adding new user');
                var user = new User();
                user.provider = "twitter";
                user.uid = profile.id;
                user.displayName = profile.displayName;
                user.image = profile._json.profile_image_url;
                user.save(function (err) {
                    if (err) {
                        throw err;
                    }
                    user.isNew = true;
                    done(null, user);
                });
            }
            //someone other than me is trying to log in
           // else {
           //     console.log('oops someone else is trying to log in..');
           //     done(null, false);
           // }
        })
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.uid);
});

passport.deserializeUser(function (uid, done) {
    User.findOne({uid: uid}, function (err, user) {
        done(err, user);
    });
});

passport.ensureAuthenticated = function (req, res, next) {
    console.log('ensure authenticated');
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.send(401);
    }

};
module.exports = passport;
