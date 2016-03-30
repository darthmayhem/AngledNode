
var express = require('express');
var router = express.Router();

var app = require('./app');
var site = require('./site');
var user = require('./user');

// app routes
router.get('/api/app/config', app.config);

// site routes
router.get('/', site.index);
router.get('/swagger', site.swagger);
router.get('/ping', site.ping);

// user routes
router.get('/api/user/status', user.status);
router.post('/api/user/update', user.update);
router.post('/api/user/register', user.register);
router.post('/api/user/login', user.login);
router.get('/api/user/logout', user.logout);

module.exports = router;
