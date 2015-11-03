var express = require('express');
var router = express.Router();

var UserProfileModel = require('../models/user');
var ApiResponse = require('../models/api-response.js');
var ApiMessages = require('../models/api-messages.js');

//var response = new ApiResponse;
//var message = new ApiMessages;
//console.log(response);

router.post('/create', function(req, res) {
  var userName = req.body.userName;
  var userEmail = req.body.userEmail;
  var userPass = req.body.userPass;

  UserProfileModel.findOne({"email": userEmail}).then(function(data) {
    // user exists
    if (data) {
      console.warn('email already exist');
      res.json(new ApiResponse({
        success: false,
        extras: {
          message: new ApiMessages().EMAIL_ALREADY_EXISTS
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
              message: new ApiMessages().COULD_NOT_CREATE_USER
            }
          }));
        }
      }).catch(function(err) {
        console.err('error on adding user',err);
      });
    }

  }).catch(function(err) {
    res.json(new ApiResponse({
      success: false,
      extras: {
        message: new ApiMessages().DB_ERROR
      }
    }));
  });


});

module.exports = router;