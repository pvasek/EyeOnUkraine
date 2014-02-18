var everyauth = require('everyauth');
var conf = require('./conf');
var model = require('./model');

exports.createDefaultUsers = function(users) {
    if (users) {
        users.forEach(function(user){
            model.User.findOne({ email: user.email},function(err, existing){
                if (!existing) {
                    console.log('creating user: ' + user.email);
                    var newUser = new model.User({id: user.id, email: user.email});
                    newUser.save();
                    console.log('user saved');
                }
            })
        })
    }
};

exports.configure = function(app){
    everyauth.debug = true;

    everyauth.everymodule.findUserById(function (id, callback) {
        model.User.findOne({aid: id}, function(err, user){
            if (user == null) {
            console.error('findUserById - user doesn\'t exists:');
            console.error(id);
            }
            if (!err) {
                callback(null, user);
            }
        });
    });


    everyauth.everymodule.moduleErrback( function (err) {
        // Do something with the err -- e.g., log it, throw it
        console.log("AUTH ERROR");
        console.log(err);
    });


    function findOrAddUser (context, source) {
        var promise = context.Promise();
        model.User.findOne({email: source.email}, function(err, user){
            if (user == null) {
                console.log("Unknown user:");
                console.log(source);
            }
            if (err) {
                promise.fail(err);
            } else {
                if (user.aid === source.id) {
                    promise.fulfill({id: user.aid, email: user.email});
                } else {
                    user.aid = source.id;
                    user.save(function(err){
                        if (err) {
                            promise.fail(err);
                        } else {
                            promise.fulfill({id: user.aid, email: user.email});
                        }
                    });
                }
            }
        });
        return promise;
    }

    everyauth.google
        .appId(conf.google.clientId)
        .appSecret(conf.google.clientSecret)
        .scope('https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email')
        .findOrCreateUser( function (sess, accessToken, extra, googleUser) {
            googleUser.refreshToken = extra.refresh_token;
            googleUser.expiresIn = extra.expires_in;
            return findOrAddUser(this, googleUser);
        })
        .redirectPath('/app');

};

