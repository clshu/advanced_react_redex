const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

/*

Incoming Request -> Router -------------------> Athentication controller -> Response
							|
							|
							---> Logged In ? -> Comments controller -> Response
							|
							|
							---> Logged In ? -> Posts controller -> Response
*/

// By default passport use cookie and session is true, set it false here
const requireAuth = passport.authenticate('jwt', { session: false});
const requireSignin = passport.authenticate('local', { session: false});


module.exports = function(app) {
	app.get('/', requireAuth, function(req, res) {
		res.send({ hi: 'there' });
	});
	app.post('/signin', requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);
		
}