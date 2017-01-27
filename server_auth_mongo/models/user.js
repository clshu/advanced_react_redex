const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
	email: { type: String, unique: true, lowercase: true },
	password: String
});

/*
	Saving a password (Sign up)

	Salt + Plain Password = (Salt + Hashed Password)

	Comparing a password (Sign in)
	(Retrieved from DB)
	(Salt + Hashed Password) <---------------
			|							compare both
			|								|
			|								|
	       Salt + Submitted Password = (Salt + Hashed Password)


*/

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
	// get access to user model
	const user = this;

	// generate a salt
	bcrypt.genSalt(10, function(err, salt){
		if (err) { return next(err)};
		// hash (encrypt) our password using the salt
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) { return next(err)};
			// overwrite plain password with encrypted password
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function(submittedPassword, callback) {
	bcrypt.compare(submittedPassword, this.password, function(err, isMatched) {
		if (err) { return callback(err); }

		callback(null, isMatched);
	});
}
// Create the model class
const User = mongoose.model('user', userSchema);

// Export modle
module.exports = User;
