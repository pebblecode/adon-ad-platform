angular.module('Sonicnet', [])
  .value('SONIC_ALPHABET', ' abcdefghijklmnopqrstuvwxyz1234567890')
  .factory('$sonicnetListener',
    ['SONIC_ALPHABET', '$rootScope',
    function(SONIC_ALPHABET, $rootScope) {
      /*global SonicCoder: true, SonicServer: true*/
      'use strict';

      var SonicnetListener = {};

      SonicnetListener.audibleRangeCoder = new SonicCoder({
        freqMin: 440,
        freqMax: 1760
      });

      SonicnetListener.server = new SonicServer({
        alphabet: SONIC_ALPHABET,
        debug: false
        // Audible range
        //coder: SonicnetListener.audibleRangeCoder
      });


      SonicnetListener.start = function() {
        if (SonicnetListener.server) {
          SonicnetListener.server.start();
        }
      };

      SonicnetListener.stop = function() {
        if (SonicnetListener.server) {
          SonicnetListener.server.stop();
        }
      };

      SonicnetListener.on = function(callback) {
        SonicnetListener.server.on('message', callback);
      };

      SonicnetListener.isRunning = function() {
        return !!SonicnetListener.server.isRunning;
      };

      return SonicnetListener;
  }])
  .factory('$sonicnetSender', ['SONIC_ALPHABET', function(SONIC_ALPHABET) {
      /*global SonicSocket: true*/
      'use strict';
      var SonicnetSender = {};

      SonicnetSender.socket = new SonicSocket({
        alphabet: SONIC_ALPHABET
      });

      SonicnetSender.send = function(message) {
        SonicnetSender.socket.send(message);
      };

      return SonicnetSender;
  }]);
