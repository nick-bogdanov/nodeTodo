var Promise = require('bluebird');
var mongoose = require('mongoose');

Promise.promisifyAll(mongoose);
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  email: { type: String, required: true, unique: true} ,
  username: { type: String, required: true },
  passwordHash: String,
  passwordSalt: String,
  created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() },
  active: { type: Boolean, default: false }
});

UserSchema.methods.createHash = function(pass) {
  var crypto = require('crypto');
  var salt = Math.random().toString();

  this.passwordSalt = salt;
  this.passwordHash = crypto.createHash('sha1', pass).update(salt).digest('hex');

};

module.exports = mongoose.model('User', UserSchema);