var everyauth = require('everyauth');
var conf = require('./conf');

exports.configure = function(app){
    var user1 = { name: "user1"};
    var usersByGoogleId = {};

    everyauth.debug = true;

    var usersById = {};
    var nextUserId = 0;

    function addUser (source, sourceUser) {
        var user = usersById[++nextUserId] = {id: nextUserId};
        //model.User.findById(source.id);
        if (user == null)
            user[source] = sourceUser;

        return user;
    }

    everyauth.everymodule
        .findUserById( function (id, callback) {
            console.log("findUserById");
            callback(null, usersById[id]);
        });


    everyauth.everymodule.moduleErrback( function (err) {
        // Do something with the err -- e.g., log it, throw it
        console.log("AUTH ERROR");
        console.log(err);
    });

    everyauth.google
        .appId(conf.google.clientId)
        .appSecret(conf.google.clientSecret)
        .scope('https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email')
        .findOrCreateUser( function (sess, accessToken, extra, googleUser) {
            googleUser.refreshToken = extra.refresh_token;
            googleUser.expiresIn = extra.expires_in;
            return usersByGoogleId[googleUser.id] || (usersByGoogleId[googleUser.id] = addUser('google', googleUser));
        })
        .redirectPath('/app');

};

