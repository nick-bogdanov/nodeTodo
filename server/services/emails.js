var jade = require('jade');
var mailer = require('nodemailer');
var config = require('config');
var Promise = require('bluebird');
var _ = require('lodash');
var os = require('os');

module.exports = exports;

function _renderTemplate(name, options) {

  var defaults = {
    "title": "Registration confirm",
    "url": os.hostname()
  };

  options = options || {};

  options = _.merge(defaults, options);

  return new Promise(function(resolve, reject) {
    jade.renderFile(__dirname + "/../emails/" + name + ".jade", options, function(err, html) {
      if (err) {
        return reject(err);
      }

      if (html) {
        return resolve(html);
      }

      return reject('Error render file');

    });
  });
}

exports.activateUser = function(_to, _options) {
  var transporter = mailer.createTransport(config.get('email.transport'));
  _renderTemplate('register', _options).then(function(data) {
    var mailerOptions = {
      from: config.get("email.options.from"), // sender address
      to: _to,
      subject: 'Confirm registration.',
      html: data
    };

    transporter.sendMail(mailerOptions, function(error, info){
      if(error){
        return Promise.reject(err);
      }

      console.log('Message sent: ' + info.response);

    });
  }).catch(function(err) {
    console.error('error on sending email: ', err);
  })
};