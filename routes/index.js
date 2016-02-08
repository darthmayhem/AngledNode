

var express = require('express');
var logger = require('./../bin/logger');
var passport = require('passport');
var mongoose = require('./../bin/db');
var router = express.Router();

//Get the app config
var config = require('./../bin/config');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: config.name,
    version: config.version,
    user: req.user
  });
});

router.get('/register', function (req, res) {
  res.render('register', {
    title: config.name,
    version: config.version,
    user: req.user,
    err: req.err
  });
});

router.post('/register', function (req, res) {
  mongoose.Users.register(new mongoose.Users({username: req.body.username}), req.body.password, function (err, user) {
    if (err) {
      logger.log('error', 'register user error: ' + err.message);
      return res.render('register', {
        title: config.name,
        version: config.version,
        user: req.user,
        err: err});
    }

    logger.log('info', 'register user: ' + req.body.username + ' registered');
    passport.authenticate('local')(req, res, function () {
      logger.log('info', 'authenticate user: ' + req.body.username + ' logged in');
      res.redirect('/');
    });
  });
});

router.get('/login', function (req, res) {
  res.render('login', {
    title: config.name,
    version: config.version,
    user: req.user,
    err: req.err
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function (err, user) {
    if (err) {
      logger.log('error', 'authentication error: ' + err.message);
      return res.render('login', {
        title: config.name,
        version: config.version,
        user: user,
        err: err
      });
    }

    if (!user){
      err = {message: "invalid username/password combination"};

      logger.log('error', 'authentication error: ' + err.message);
      return res.render('login', {
        title: config.name,
        version: config.version,
        user: user,
        err: err
      });
    }

    logger.log('info', 'authenticate user: ' + user.username + ' logged in');
    res.redirect('/');
  })(req, res, next);
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/ping', function (req, res) {
  res.status(200).send("pong!");
});

module.exports = router;
