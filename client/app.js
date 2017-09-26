angular.module('topFive', ['ngRoute', 'ngCookies'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl : 'partials/auth/_index.html',
      controller : 'authController',
    })
    .when('/topfive', {
      templateUrl : 'partials/topfive/_index.html',
      controller : 'messageController',
    })
    .otherwise( {
      redirectTo : '/',
    });
  }])
