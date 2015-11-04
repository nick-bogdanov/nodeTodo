var mongoose = require('mongoose');
var crypto = require('crypto');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: { type: String, required: true, unique: true} ,
  username: { type: String, required: true },
  passwordHash: String,
  passwordSalt: String,
  activateToken: String,
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  active: { type: Boolean, default: false }
});

UserSchema.methods.createHash = function(pass) {
  var salt = Math.random().toString();

  this.passwordSalt = salt;
  this.passwordHash = crypto.createHash('sha1', pass).update(salt).digest('hex');

};

UserSchema.methods.createToken = function() {

  this.activateToken = crypto.randomBytes(48).toString('hex');

};

module.exports = mongoose.model('User', UserSchema);