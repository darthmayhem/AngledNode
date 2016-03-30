
var config = require('./../bin/config');

exports.index = function (req, res, next) {
    res.render('index', {
        title: config.name,
        version: config.version,
        user: req.user
    });
};

exports.swagger = function (req, res) {
    res.redirect('/swagger-ui/dist/index.html');
};

exports.ping = function (req, res) {
    res.status(200).send("pong!");
};
