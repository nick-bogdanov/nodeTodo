var AccountController = function() {
  this.UserProfileModel = require('../models/user');
  this.ApiResponse = require('../models/api-response.js');
  this.ApiMessages = require('../models/api-messages.js');
};

AccountController.prototype.createUser = function(newUser, callback) {
  var _this = this;

  this.UserProfileModel.findOne({"email": newUser.userEmail}, {}, function(err, user) {

    if (err) {
      return callback(err, new _this.ApiResponse({success: false, extras: {message: _this.ApiMessages.DB_ERROR}}));
    }

    if (user) {
      return callback(err, new _this.ApiResponse({success: false, extras: {message: _this.ApiMessages.EMAIL_ALREADY_EXISTS}}));
    }else{
      var userModel = new _this.UserProfileModel({
        username: newUser.userName,
        email: newUser.userEmail,
        created_at: Date.now(),
        updated_at: Date.now()
      });

      userModel.createHash(newUser.userPass);

      userModel.save(function(err, data, numberAffected) {

        if (err) {
          return callback(err, _this.ApiResponse({success: false, extras: {message: _this.ApiMessages.DB_ERROR}}));
        }

        if (numberAffected === 1) {

          return callback(err, new _this.ApiResponse({
            success: true,
            extras: {
              message: 'done'
            }
          }));
        }else{
          return callback(err, _this.ApiResponse({success: false, extras: {message: _this.ApiMessages.COULD_NOT_CREATE_USER}}));
        }

      });

    }

  });

};

module.exports = AccountController;