var express = require('express');
var router = express.Router();
var path = require('path');
var mime = require('mime');

/* GET home page. */
router.get('*', function(req, res, next) {
  var file = path.join(__dirname + '../../client/views/index.html');
  var type = mime.lookup(path.basename(decodeURI(req.url)));
  console.log(type);
  //todo: fix mime type
  res.setHeader('Content-Type', type);
  res.render('index');

});

module.exports = router;
