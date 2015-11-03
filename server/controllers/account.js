var express = require('express');
var router = express.Router();

var UserProfileModel = require('../models/user');
var ApiMessages = require('../models/api-messages');
var ApiResponse = require('../models/api-response');

console.log('err', ApiMessages.EMAIL_ALREADY_EXISTS);

router.post('/create', function(req, res) {
  var userName = req.body.userName;
  var userEmail = req.body.userEmail;
  var userPass = req.body.userPass;

  UserProfileModel.findOne({"email": userEmail}).then(function(data) {

    if (data) {
      console.warn('email already exist');
      res.json(new ApiResponse({
        success: false,
        extras: {
          message: ApiMessages.EMAIL_ALREADY_EXISTS
        }
      }));
    }

    // try to create user
    if (!data) {

      var user = UserProfileModel({
        username: userName,
        email: userEmail
      });

      user.createHash(userPass);

      user.saveAsync().then(function(data) {
        if (data) {
          console.dir('user created');
          res.json(new ApiResponse({
            success: true,
            extras: {
              message: 'User was created successful'
            }
          }));
        }else{
          console.error('could not create user');
          res.json(new ApiResponse({
            success: false,
            extras: {
              message: ApiMessages.COULD_NOT_CREATE_USER
            }
          }));
        }
      }).catch(function(err) {
        console.err('error on adding user',err);
      });
    }

  }).catch(function(err) {
    console.log(err);
    res.json(new ApiResponse({
      success: false,
      extras: {
        message: ApiMessages.DB_ERROR
      }
    }));
  });


});

module.exports = router;