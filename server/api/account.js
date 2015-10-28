var express = require('express');
var router = express.Router();

var AccountController = require('../controllers/account');
var account = new AccountController();

router.post('/create', function(req, res) {
  account.createUser({
    userName: req.body.userName,
    userEmail: req.body.userEmail,
    userPass: req.body.userPass
  }, function(err, message) {
    res.json(message);
  });
});

module.exports = router;