(function(angular) {
  'use strict';

  angular.module('todo', ['ngRoute', 'ngMdIcons', 'ngMaterial']).config(function($routeProvider, $mdThemingProvider) {

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
        controller: 'RegisterController',
        controllerAs: 'vm'
      })
      .when('/confirm', {
        templateUrl: '/views/confirm-register'
      })
      .otherwise({
        redirectTo: '/register'
    });
    console.log($mdThemingProvider);
    //$mdThemingProvider.theme('default').dark();

  });

})(angular);