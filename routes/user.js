
//var express = require('express');
var logger = require('./../bin/logger');
var passport = require('passport');
var mongoose = require('./../bin/db');

exports.status = function(req, res) {
  try{
      if (!req.isAuthenticated()) {
          return res.status(200).json({
              user: {},
              status: req.user != null
          });
      }
      res.status(200).json({
          user: req.user,
          status: req.user != null
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

    } catch (ex) {
        res.status(500).json({
            code: 500,
            message: ex.message
        });
    }
};

exports.register = function (req, res) {
  mongoose.Users.register(new mongoose.Users({username: req.body.username, email: req.body.email, firstname: req.body.firstname, lastname: req.body.firstname}), req.body.password, function (err, user) {
    if (err) {
      logger.log('error', 'register user error: ' + err.message);
      return res.status(500).json({
        code: 500,
        message: err.message
      });
    }

    logger.log('info', 'register user: ' + req.body.username + ' registered');
    passport.authenticate('local')(req, res, function () {
      logger.log('info', 'authenticate user: ' + req.body.username + ' logged in');

      return res.status(200).json({
        user: req.body.username,
        updated: true
      });
    });
  });
};

exports.login = function(req, res, next) {
    try{
        passport.authenticate('local', function(err, user, info) {
            if (err)
                return res.status(500).json({
                    code: 500,
                    err: 'Authentication service error: Could not log in user'
                });

            if (!user) {
                logger.log('info', 'User login failure: ' + req.body.username);

                return res.status(401).json({
                    code: 401,
                    message: info
                });
            }

            req.logIn(user, function(err) {
                if (err) {
                    return res.status(500).json({
                        code: 500,
                        message: 'Error: Could not log in user'
                    });
                }

                logger.log('info', 'User login: ' + req.body.username);

                res.status(200).json({
                    username: user.username,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname
                });
            });
        })(req, res, next);

    } catch (ex) {
        res.status(500).json({
            code: 500,
            message: ex.message
        });
    }
};

exports.logout = function (req, res) {
    try {
        logger.log('info', 'User logout: ' + req.user.username);

        req.session.destroy(function(){});
        delete req.session;
        req.logout();

        res.status(200).json({
            "user": { name: "anonymous" },
            "status": req.user != null
        });

    } catch (ex) {
        res.status(500).json({
            code: 500,
            message: ex.message
        });
    }
};
