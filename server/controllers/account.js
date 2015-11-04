var express = require('express');
var router = express.Router();
var email = require('../services/emails');

var UserProfileModel = require('../models/user');
var ApiMessages = require('../models/api-messages');
var ApiResponse = require('../models/api-response');

router.post('/create', function(req, res) {
  var userName = req.body.userName;
  var userEmail = req.body.userEmail;
  var userPass = req.body.userPass;
  var url = req.protocol + '://' + req.get('host');

  UserProfileModel.findOne({"email": userEmail}).then(function(data) {

    if (data) {
      console.error('email already exist');

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

      user.createToken();
      user.createHash(userPass);

      user.saveAsync().then(function(data) {
        if (data) {
          console.dir('user created');

          email.activateUser(userEmail, {
            username: userName,
            token: data.activateToken,
            url: url + '/#/confirm'
          });

          res.json(new ApiResponse({
            success: true,
            extras: {
              message: ApiMessages.USER_ADDED
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
        console.error('error on adding user', err);
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