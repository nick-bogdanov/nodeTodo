var express = require('express');
var router = express.Router();
var controller = require('../controllers/_account');

router.get('/', function(req, res, next) {
  res.json('form');
});

router.post('/user-create', function(req, res, next) {
  console.log(controller);
});

module.exports = router;