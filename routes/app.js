
var config = require('./../bin/config');

exports.config = function(req, res) {
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
};
