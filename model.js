var mongoose = require('mongoose');


var UserSchema = new Schema({
    id: { type: String}
  , email: { type: String}
  , lastLogin: { type: String}
});

export.User = mongoose.model('User', UserSchema);