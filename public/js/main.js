angular.module('AdOnPlatform', ['ngRoute', 'Primus', 'Sonicnet', 'mgo-angular-wizard'])
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
      .when('/listen', {
        templateUrl: '/templates/listen.html',
        controller: 'AdvertListenCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);