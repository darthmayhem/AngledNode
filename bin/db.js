/**
 *  mongoose initialization
 */

var config = require('./config');
var logger = require('./logger');

// Bring Mongoose into the app
var mongoose = require( 'mongoose' );

// Build the connection string
var dbURI = config.resources.db_uri;

// Create the database connection
mongoose.connect(dbURI);

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {
    logger.log('info', 'Mongoose default connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
    logger.log('error', 'Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    logger.log('info', 'Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        logger.log('info', 'Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

// BRING IN MODELS
mongoose.Users = require('./models/users').Users;

module.exports = mongoose;