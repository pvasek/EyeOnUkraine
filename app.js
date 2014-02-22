
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
var MongoStore = require('connect-mongo')(express);
var hosting = require('./hosting');
var mongorest = require('./rest-mongodb');

var app = express();


// connect to db
var mongoUrl = hosting.getMongoUrl('mongodb://localhost/eyeonukraine');
var db = mongoose.connection;
db.on('error', console.error);

mongoose.connect(mongoUrl, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + mongoUrl + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + mongoUrl);
    }
});

// all environments
app.configure(function(){

    auth.createDefaultUsers(conf.users);
    auth.configure(app);

    app.engine('html', swig.renderFile);
    app.set('port', hosting.getPort(3000));
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
    //app.use(express.session({secret: 'hgrr389grud'}));
    app.use(express.session({
         secret: 'hgrr389grud',
         maxAge: new Date(Date.now() + 1200000),//20min
         store: new MongoStore({
             mongoose_connection: mongoose.createConnection(mongoUrl)
         })
    }));
    app.use(everyauth.middleware());
    app.use(app.router);
});

// development only
app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


function authorizedOnly(req, res, next) {
    if (req.loggedIn) {
        return next();
    }
    return res.redirect('/login');
}


// helper function which register all routes for REST entity
app.resource = function(path, obj) {
    this.get(path, obj.getList);
    this.get(path + '/:id', authorizedOnly, function(req, res){
        obj.get(req, res, req.params.id);
    });
    this.del(path + '/:id', authorizedOnly, function(req, res){
        obj.deleteItem(req, res, req.params.id);
    });
    this.put(path + '/:id', authorizedOnly, function(req, res){
        obj.put(req, res);
    });
    this.post(path, authorizedOnly, function(req, res) {
        obj.post(req, res, req.params.id);
    });
};

// routes
app.get('/', routes.index);
app.get('/login', portal.login);
app.get('/logout', portal.logout);
app.get('/app', authorizedOnly, portal.index);
app.get('/app/*', authorizedOnly, portal.index);

// REST routes
app.resource('/api/case', mongorest(model.Case));
app.resource('/api/user', mongorest(model.User));

var port = app.get('port');
http.createServer(app).listen(port, function(){
  console.log('Connect to http://localhost:' + port);
});
