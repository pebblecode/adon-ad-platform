angular.module('AdOnPlatform')
  .controller('AdvertCtrl', ['$scope', 'Adverts', function($scope, Adverts) {

    $scope.adverts = Adverts.getAllAdverts();

    $scope.newAd = function() {
      Adverts.add({});
    }

    $scope.saveAd = function(index) {
      Adverts.save(index);
    }


  }]);