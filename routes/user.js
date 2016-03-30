
//var express = require('express');
var logger = require('./../bin/logger');
var passport = require('passport');
var mongoose = require('./../bin/db');

exports.status = function(req, res) {
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
};

exports.update = function(req, res) {
    try{
        var query = {'username': req.body.username};

        req.newData = {};
        req.newData.username = req.body.username;
        req.newData.email = req.body.email;
        req.newData.firstname = req.body.firstname;
        req.newData.lastname = req.body.lastname;

        mongoose.Users.update(query, req.newData, function(err, doc){
            if (err) return res.send(500, { code: 500, message: err });
            else {
                res.status(200).json({
                    user: req.body.username,
                    updated: true
                });
            }
        });

        /*
        mongoose.Users.findOneAndUpdate(query, req.newData, {upsert:true}, function(err, doc){
            if (err) return res.send(500, { code: 500, message: err });
            else {
                res.status(200).json({
                    user: req.username,
                    updated: true
                });
            }
        });
        */
        
    } catch (ex) {
        res.status(500).json({
            code: 500,
            message: ex.message
        });
    }
};

exports.register = function (req, res) {
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
};

exports.login = function(req, res, next) {

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
};

exports.logout = function (req, res) {
  req.logout();
  res.redirect('/');
};
