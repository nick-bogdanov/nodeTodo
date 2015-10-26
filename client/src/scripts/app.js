(function(window, angular) {
  'use strict';

  var app = angular.module('todo', ['ngRoute']);

  app.config(function($routeProvider) {

    $routeProvider
      .when('/list', {
        templateUrl: '/views/list',
        controller: 'listController'
      })
      .when('/login', {
        templateUrl: '/views/login',
        controller: 'LoginController'
      })
      .when('/register', {
        templateUrl: '/views/register',
        controller: 'RegisterController'
      })
      .otherwise({
        redirectTo: '/list'
    });

  })

})(window, angular);