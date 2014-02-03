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
        controller: 'AdvertCtrl',
        resolve: {
          adData: ['$adverts', function($adverts) {
            $adverts.getAllAdverts();
          }]
        }
      })
      .when('/listen', {
        templateUrl: '/templates/listen.html',
        controller: 'AdvertListenCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });

  }]);