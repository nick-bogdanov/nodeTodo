var express = require('express');
var router = express.Router();

router.post('/users', function(req, res) {
  var collection = req.db.get('users');

  collection.find({}, {"name": "test"}, function(e, data) {
    res.json(data);
  });

});

module.exports = router;