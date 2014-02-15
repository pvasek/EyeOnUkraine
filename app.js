
/**
 * Module dependencies.
 */

var http = require('http');
var express = require('express');
var swig = require('swig');
var everyauth = require('everyauth');
var routes = require('./routes');
var user = require('./routes/portal');
var path = require('path');
var portal = require('./routes/portal');
var auth = require('./auth');
var conf = require('./conf');
var mongoose = require('mongoose');
var model = require('./model');

var app = express();


// all environments
app.configure(function(){

    auth.createDefaultUsers(conf.users);
    auth.configure(app);

    app.engine('html', swig.renderFile);
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'html');
    app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser('UDSQ_QTttvGCisFSKJTUmQ6Bf3VRpY'));
    //app.use(express.cookieSession());
    app.use(express.session({secret: 'hgrr389grud'}));
    app.use(everyauth.middleware());
    app.use(app.router);
});

// development only
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

// connect to db
var dbUri = 'mongodb://localhost/eyeonukraine';

var db = mongoose.connection;

db.on('error', console.error);

mongoose.connect(dbUri, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + dbUri + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + dbUri);
    }
});


function authorizedOnly(req, res, next) {
    if (req.loggedIn) {
        return next();
    }
    return res.redirect('/login');
}

// routes
app.get('/', routes.index);
app.get('/login', portal.login);
app.get('/logout', portal.logout);
app.get('/app', authorizedOnly, portal.index);


var port = app.get('port');
http.createServer(app).listen(port, function(){
  console.log('Express server listening on port ' + port);
});
