const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');


function tokenForUser(user) {
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signin = function(req, res, next) {
	// email and password is auth'd by passport's LocalStrategy
	// req.user is passed down from LocalStrategy's 
	// done(null, user)
	// Just send back token
	res.send({ token: tokenForUser(req.user) });
}

exports.signup = function(req, res, next) {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		res.status(422).send({ error: "You must prove email and password"});
	}
	
	// See if user with the given email exists
	User.findOne({email: email}, function(err, existingUser) {
		//console.log('findOne:' + err);
		if (err) { return next(err); }
		if (existingUser) {
			// If a user with email does exist, return an error 
			return res.status(422).send({ error: "Email in use"});
		}

		// If not, create and save user to DB
		const user = new User({
			email: email,
			password: password
		});

/* JWT life cycle
	
When signing up or signing in, give a token in exchange for an id 

	User ID + Our Secret String = JSON Web Token

In the future, when a user makes an authenticated request they should include their JWT

	JSON Web Token + Our Secret String = User ID
*/
		user.save(function(err) {
			if (err) { return next(err); }
			// respond to request with a token
			res.json({ token: tokenForUser(user) });
		});

	});
	
	
	

}