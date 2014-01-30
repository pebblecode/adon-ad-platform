angular.module('AdOnPlatform', ['ngRoute'])
  .config(['$routeProvider', '$provide', function($routeProvider, $provide) {
    'use strict';

    $provide.value('foo', 'bar');

    $routeProvider
      .when('/', {
        templateUrl: '/templates/home.html'
      })
      .when('/manage', {
        templateUrl: '/templates/manage.html',
        controller: 'AdvertCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);