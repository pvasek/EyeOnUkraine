var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
    aid: { type: 'String'},
    email: { type: 'String'}
    //lastLogin: { type: 'String'}
});

exports.User = mongoose.model('User', UserSchema);
