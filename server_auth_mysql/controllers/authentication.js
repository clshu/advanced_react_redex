const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config.js');
const models = require('../models');


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
		res.status(422).send("You must provide email and password");
	}
	
	// See if user with the given email exists
	models.User.findOne({ where: {email: email}})
		.then(function(existingUser) {
			if (existingUser) {
				// If a user with email does exist, return an error 
				return res.status(422).send("Email in use");
			}

			// If not, create and save user to DB
			// A beforeCreate hook will encrypt the password
			// before reall creation happens
			models.User.create({
				email: email,
				password: password
			})
			.then(function(user) {
				return res.json({ token: tokenForUser(user) });
			})
			.catch(err => {
				return next(err);
			})

		}).catch(err => {
			return next(err);
		})
}
	