var express = require('express');
var router = express.Router();

var AccountController = require('../controllers/account');
var account = new AccountController();

router.post('/create', function(req, res, next) {
  account.createUser({
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userPass: req.body.userPass
  }, function(err, message) {
    if (!message.success) {
      res.json(message);
    }
  });
});

module.exports = router;