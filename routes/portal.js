
exports.index = function(req, res){
    req.user = req.user || {};
    req.user.google = req.user.google || {};
    res.render('app', { userEmail: req.user.google.email, userPictureUrl: req.user.google.picture })
};

exports.login = function(req, res){
    req.logout();
    res.render('login');
};

exports.logout = function(req, res){
    req.logout();
    res.redirect('/login');
};
