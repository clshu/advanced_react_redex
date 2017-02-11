const passport = require('passport');
const models = require('../models');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
/*

Incoming Request --> Passport --> Route Handler
											|
											|
			|-----------------------|
			|												|
			|												|
	Passport Strategy 1		Passport Strategy 2
			|												|
			|												|
		Verify User			Verify User with a
		with a JWT 			email and password
*/

/*

Signing up --> Verify email is not in use --> Token

Signing in --> Verify email/password --> Token

Auth's request --> Verify Token --> Resource Access

*/

// Set Options for Local
// By default local strategy will look for username and password
// Replace username with email
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
	// Verify this email and password, call done with the user
	// if it is correct email and password
	// otherwise, call done with false
	models.User.findOne({where: {email: email}})
	.then(function(user) {
		// No matching user
		if (!user) { return done(null, false); }

		// compare passwords
		// comparePassword is an instance method defined in User Model
		// it compares the plain password in 1st argument with this.password,
		// which is hashed password
		user.comparePassword(password, function(err, isMatched) {
			if (err) { return done(err); }
			if (!isMatched) { return done(null, false); }

			return done(null, user);
		});
	})
	.catch(function(err) {
		if (err) { return done(err, false); }
	})
});

// Set Options for JWT
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function (payload, done) {
	// See if the user ID in payload exists in our database
	// If it does, call 'done' with that user
	// otherwise, call 'done' without a user object

	models.User.findById(payload.sub)
	.then(function(user) {
		if (user) {
			return done(null, user);
		} else {
			return done(null, false); // Failed case
		}
	})
	.catch(function(err){
		if (err) { return done(err, false);} // Failed case
	});
});

// Tell passprot to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
