
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

router.get('/api/app/config', function(req, res) {
    try{
        return res.status(200).json({
            appName: config.name,
            appVersion: config.version
        });
    } catch (ex) {
        res.status(500).json({
            code: 500,
            message: ex
        });
    }
});

router.get('/api/user/status', function(req, res) {
  try{
      if (!req.isAuthenticated()) {
          return res.status(200).json({
              user: "anonymous",
              status: false
          });
      }
      res.status(200).json({
          user: req.user,
          status: true
      });
  } catch (ex) {
      res.status(500).json({
          code: 500,
          message: ex
      });
  }
});

router.post('/api/user/update', function(req, res) {
    try{
        var query = {'username': req.username};

        req.newData = {};
        req.newData.email = req.email;
        req.newData.firstname = req.firstname;
        req.newData.lastname = req.lastname;

        mongoose.Users.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
            if (err) return res.send(500, { code: 500, message: err });
        });

        res.status(200).json({
            user: req.user.username,
            updated: true
        });
    } catch (ex) {
        res.status(500).json({
            code: 500,
            message: ex.message
        });
    }
});

router.post('/api/user/register', function (req, res) {
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

router.post('/api/user/login', function(req, res, next) {

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

router.get('/api/user/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/swagger-ui', function (req, res) {
    res.redirect('/swagger-ui/dist/index.html');
});

router.get('/ping', function (req, res) {
  res.status(200).send("pong!");
});

module.exports = router;
