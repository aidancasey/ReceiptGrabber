'use strict';

var express = require('express'),
    favicon = require('static-favicon'),
    morgan = require('morgan'),
    compression = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    errorHandler = require('errorhandler'),
    path = require('path'),
    config = require('./config'),
    passport = require('passport'),
    mongoStore = require('connect-mongo')(session);

/**
 * Express configuration
 */
module.exports = function (app) {
    var env = app.get('env');

    if ('development' === env) {
        app.use(require('connect-livereload')());

        // Disable caching of scripts for easier testing
        app.use(function noCache(req, res, next) {
            if (req.url.indexOf('/scripts/') === 0) {
                res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
                res.header('Pragma', 'no-cache');
                res.header('Expires', 0);
            }
            next();
        });

        app.use(express.static(path.join(config.root, '.tmp')));
        app.use(express.static(path.join(config.root, 'app')));
        app.set('views', config.root + '/app/views');
    }

    if ('production' === env) {


        //http://stackoverflow.com/questions/7185074/heroku-nodejs-http-to-https-ssl-forced-redirect
       // force everything on SSL when running behind Heroku load balancers...

        var forceSsl = function (req, res, next) {
            if (req.headers['x-forwarded-proto'] !== 'https') {
                return res.redirect(['https://', req.get('Host'), req.url].join(''));
            } else {
                next();
            }
        };

        app.use(forceSsl);


        app.use(compression());
        app.use(favicon(path.join(config.root, 'public', 'favicon.ico')));
        app.use(express.static(path.join(config.root, 'public')));
        app.set('views', config.root + '/views');
    }

    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');
    app.use(morgan('dev'));
    app.use(bodyParser());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(logErrors);

    // Persist sessions with mongo Store
    app.use(session({
        secret: 'ssh-its-classified',
        store: new mongoStore({
            url: config.mongo.uri,
            collection: 'sessions'
        }, function () {
            console.log('db connection is now open');
        })
    }));

    // Use passport session
    app.use(passport.initialize());
    app.use(passport.session());

    // Error handler - has to be last
    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }

    function logErrors(err, req, res, next) {
        console.error(err.stack);
        next(err);
    }

};