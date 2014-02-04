angular.module('AdOnPlatform')
  .factory('$adverts', ['$http', '$primus', function($http, $primus) {
    'use strict';
    
    var Adverts = {};

    Adverts.data = {
      ads: []
    };

    Adverts.getAds = function() {
      return Adverts.data.ads;
    }

    Adverts.add = function(ad) {
      Adverts.data.ads.push(ad);
    };

    Adverts.replace = function(index, ad) {
      Adverts.data.ads[index] = ad;
    }

    Adverts.remove = function(index) {
      Adverts.data.ads.splice(index, 1);
    }

    Adverts.getAllAdverts = function() {
      $primus.send('getAllAdverts', {}, function(data) {
        Adverts.data.ads = data;
      });
    };

    Adverts.getAdvertById = function(id, callback) {
      $primus.send('getAdvertById', id, callback);
    };

    Adverts.incrementAdvertView = function(id, callback) {
      $primus.send('incrementAdvertView', id, callback);
    };

    Adverts.save = function(index) {
      var ad = Adverts.data.ads[index];
      $primus.send('saveAdvert', ad, function(data) {
        Adverts.replace(index, data);
      });
    };

    Adverts.del = function(index) {
      var ad = Adverts.data.ads[index];
      $primus.send('deleteAdvert', ad, function(data) {
        Adverts.remove(index);
      })
    }

    return Adverts;
  }]);