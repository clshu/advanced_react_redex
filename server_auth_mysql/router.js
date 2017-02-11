const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

/*

Incoming Request -> Router -------------------> Athentication route hand -> Response
							|
							|
							---> Logged In ? -> Comments handler -> Response
							|
							|
							---> Logged In ? -> Posts handler -> Response
*/

// By default passport use cookie and session is true, set it false here
const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', { session: false});


module.exports = function(app) {
	app.get('/', requireAuth, function(req, res) {
		res.send({ message: 'Backend Resources Accessed' });
	});
	app.post('/signin', requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);

}
