angular.module('AdOnPlatform')
  .controller('AdvertCtrl', ['$scope', '$adverts', function($scope, $adverts) {
    'use strict';

    $scope.adverts = $adverts;

    $scope.newAd = function() {
      $scope.adverts.add({});
    };

    $scope.cancel = function(index) {
      $scope.adverts.remove(index);
    };

    $scope.saveAd = function(index) {
      $scope.adverts.save(index);
    };

    $scope.delAd = function(index) {
      $scope.adverts.del(index);
    };

    $scope.playAd = function(index) {
      $scope.adverts.play(index);
    };

  }]);