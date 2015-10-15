var express = require('express');
var router = express.Router();
var controller = require('../controllers/account');

router.get('/', function(req, res, next) {
  res.render('form')
});

router.post('/user-create', function(req, res, next) {
  console.log(controller);
});

module.exports = router;