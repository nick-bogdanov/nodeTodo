var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true},
  passwordHash: String,
  passwordSalt: String,
  created_at: Date,
  updated_at: Date
});

UserSchema.methods.createHash = function(pass) {
  var crypto = require('crypto');
  var salt = Math.random().toString();

  this.passwordSalt = salt;
  this.passwordHash = crypto.createHash('sha1', pass).update(salt).digest('hex');

};

module.exports = mongoose.model('User', UserSchema);