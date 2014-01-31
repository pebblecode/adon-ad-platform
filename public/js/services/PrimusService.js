angular.module('Primus', [])
    .factory('PrimusSocket', function() {
      return new Primus({
        host: window.location.hostname,
        port: window.location.port
      });
    })
    .factory('$primus', ['$rootScope', 'PrimusSocket', function($rootScope, PrimusSocket) {
      'use strict';

      var socket = PrimusSocket;

      // Private function to handle an incoming request via primus
      // and invoke the callback function with the correct arguments
      var onCallback = function (callback, args) {
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      };

      // Private function to handle an optional callback when sending data
      // via Primus.
      var emitCallback = function (callback, args) {
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      };

      var $primus = {};

      $primus.on = function(name, callback) {
        socket.on(name, function() {
          onCallback(callback, arguments);
        });
      };

      $primus.send = function(name, data, callback) {
        socket.send(name, angular.fromJson(angular.toJson(data)), function () {
          emitCallback(callback, arguments);
        });
      };

      return $primus;

    }]);