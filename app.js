var express = require('express');

var config = require('./bin/config');

var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var logger = require('./bin/logger');

//app components
var mongoose = require('./bin/db');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

//create the application
var app = express();

// Configure the routes
var routes = require('./routes/index', './routes/user');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public/images/icons', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Set up authentication and sessions
app.use(require('express-session')({
  secret: config.appKey,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

//Set up the routes
app.use('/', routes);

// attach the mongoose db
app.db = mongoose;

// passport config
passport.use(new LocalStrategy(app.db.Users.authenticate()));
passport.serializeUser(app.db.Users.serializeUser());
passport.deserializeUser(app.db.Users.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
