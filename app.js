
/**
 * Module dependencies.
 */

var express = require('express')
  , conf = require('./conf')
  , routes = require('./routes')
  , everyauth = require('everyauth')
  , path = require('path')
  , swig = require('swig');


var app = module.exports = express();


// everyauth
var user1 = { name: "user1"};
var usersByGoogleId = {};

everyauth.debug = true;

var usersById = {};
var nextUserId = 0;

function addUser (source, sourceUser) {
  var user;
  if (arguments.length === 1) { // password-based
    user = sourceUser = source;
    user.id = ++nextUserId;
    return usersById[nextUserId] = user;
  } else { // non-password-based
    user = usersById[++nextUserId] = {id: nextUserId};
    user[source] = sourceUser;
  }
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

everyauth.helpExpress(app);


// Configuration

app.engine('html', swig.renderFile);

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'html');
  app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'hgrr389grud'}));
  app.use(everyauth.middleware());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  //app.use(express.errorHandler()); 
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});


// Routes
routes(app, everyauth);

app.listen(3000);
//console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
