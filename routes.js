 module.exports = function(app, everyauth) {

	app.get('/app', isLoggedIn, function(req, res){

		req.user = req.user || {};
		req.user.google = req.user.google || {};

	  res.render('app', { userEmail: req.user.google.email, userPictureUrl: req.user.google.picture })
	});

	app.get('/login', function(req, res){
		req.logout();
	  	res.render('login');
	});

	app.get('/logout', function(req, res){
		req.logout();
	  	res.redirect('/');
	});

	app.get('/', function(req, res){
	  res.render('index', { title: 'Express' })
	});


	function isLoggedIn(req, res, next) {
		
		console.log(req.session);
		if (req.loggedIn)
			return next();

		// if they aren't redirect them to the home page
		res.redirect('/login');
	}

}