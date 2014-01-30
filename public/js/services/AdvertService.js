angular.module('AdOnPlatform')
  .factory('Adverts', ['$http', function($http) {
    'use strict';
    
    var Adverts = {};

    Adverts.data = {};

    Adverts.add = function(ad) {
      if (!Adverts.data.ads) {
        Adverts.data.ads = [];
      }
      Adverts.data.ads.push(ad);
    };

    Adverts.getAllAdverts = function() {
      $http({
        method: 'GET',
        url: '/api/adverts'
      })
      .success(function(data) {
        Adverts.data.ads = data;
      });

      return Adverts.data;
    };

    Adverts.save = function(index) {
      var ad = Adverts.data.ads[index];
      $http({
        method: 'PUT',
        url: '/api/adverts',
        data: ad
      }).then(function(data) {
        console.log(data.data);
        Adverts.data.ads[index] = data.data;
      });

    }

    return Adverts;
  }]);