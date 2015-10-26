var users = require('../api/account');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/views/:name', function(req, res) {
    res.render(req.params.name);
  });

  app.use('/api/users', users);

};