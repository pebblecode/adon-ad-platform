angular.module('AdOnPlatform')
  .controller('AdvertListenCtrl',
    ['$scope', 'WizardHandler', '$sonicnetListener',
    function($scope, WizardHandler, $sonicnetListener) {
    'use strict';

    $scope.finishedListening = function() {
      console.log('Finished');
    };

    $scope.startListening = function() {
      console.log('Start Listening');
      if ($sonicnetListener.isRunning()) {
        $sonicnetListener.stop();
      }
      $sonicnetListener.start()
        .then(function(shortcode) {
          console.log(shortcode);
          $sonicnetListener.stop();
        });
      WizardHandler.wizard().next();
    };

    $scope.stopListening = function() {
     console.log('Stop Listening');
     if ($sonicnetListener.isRunning()) {
       $sonicnetListener.stop();
     }
     WizardHandler.wizard().goTo(0);
    };
  }]);