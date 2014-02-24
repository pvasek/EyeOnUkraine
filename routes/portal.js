var everyauth = require('everyauth');

exports.index = function(req, res){
    res.render('app', { currentUser: req.user })
};

exports.login = function(req, res){
    req.logout();
    res.render('login');
};

exports.logout = function(req, res){
    req.logout();
    res.redirect('/login');
};
