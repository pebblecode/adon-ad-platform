angular.module('AdOnPlatform')
  .controller('AdvertCtrl', ['$scope', '$adverts', function($scope, $adverts) {
    'use strict';

    $scope.adverts = $adverts;

    $scope.newAd = function() {
      $scope.adverts.add({});
    };

    $scope.saveAd = function(index) {
      $scope.adverts.save(index);
    };

    $scope.delAd = function(index) {
      $scope.adverts.del(index);
    }

  }]);