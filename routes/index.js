
var config = require('./../bin/config');
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

router.get('/app/config', function(req, res) {
  return res.status(200).json({
    appName: config.name,
    appVersion: config.version
  });
});

router.get('/user/status', function(req, res) {
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      status: false
    });
  }
  res.status(200).json({
    user: req.user,
    status: true
  });
});

router.post('/user/update', function(req, res) {
  var query = {'username': req.user.username};

  req.newData = {};
  req.newData.email = req.user.email;
  req.newData.firstname = req.user.firstname;
  req.newData.lastname = req.user.lastname;

  mongoose.Users.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
  });

  res.status(200).json({
    user: req.user.username,
    updated: true
  });
});

router.post('/user/register', function (req, res) {
  mongoose.Users.register(new mongoose.Users({username: req.body.username, email: req.body.email, firstname: "", lastname: ""}), req.body.password, function (err, user) {
    if (err) {
      logger.log('error', 'register user error: ' + err.message);
      return res.status(500).json({
        err: err
      });
    }

    logger.log('info', 'register user: ' + req.body.username + ' registered');
    passport.authenticate('local')(req, res, function () {
      logger.log('info', 'authenticate user: ' + req.body.username + ' logged in');

      return res.status(200).json({
        status: 'Registration successful!',
        username: req.body.username
      });
    });
  });
});

router.post('/user/login', function(req, res, next) {

  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      res.status(200).json({
        status: 'Login successful!',
        username: user.username
      });
    });
  })(req, res, next);
});

router.get('/user/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/ping', function (req, res) {
  res.status(200).send("pong!");
});

module.exports = router;
