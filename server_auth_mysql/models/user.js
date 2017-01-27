const bcrypt = require('bcrypt-nodejs');

'use strict';

function hashPassword(user, options, callback) {
  const SALT_FACTOR = 10;
  bcrypt.genSalt(SALT_FACTOR, function(err, salt){
        if (err) { return callback(err); }
        // hash (encrypt) our password using the salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
          if (err) { return callback(err); }
           // overwrite plain password with encrypted password
          user.password = hash;
          return callback(null, options);
        });
  })
}

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks: {
      beforeCreate: hashPassword
    },
    instanceMethods: {
      comparePassword: function(plainPassword, callback) {
        bcrypt.compare(plainPassword, this.password, function(err, isMatched) {
            if (err) { return callback(err); }
            return callback(null, isMatched);
        });
      }
    }
  }
  );

  return User;
};

