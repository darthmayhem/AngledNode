/**
 *  user object model definition
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    id : ObjectId,
    username : String,
    password : String,
    created : Date,
    updated : Date
});

User.plugin(passportLocalMongoose);

module.exports.Users = mongoose.model('Users', User);
