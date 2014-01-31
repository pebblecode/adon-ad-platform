//var _ = require('lodash');
var Hoek = require('hoek');
var Hapi = require('hapi');
var ModellaMongo = require('modella-mongo')
var Primus = require('primus');
var Emitter = require('primus-emitter');

module.exports = function(config) {
  'use strict';

  var Instance = {
    socketConnections: []
  };

  Instance.config = config;

  Instance.server = Hapi.createServer(Instance.config.server.host, Instance.config.server.port, {
    files: Instance.config.server.files
  });

  Instance.db = {
    _connection: ModellaMongo(Instance.config.database.connectionString)
  };

  Instance.websocket = new Primus(Instance.server.listener, { transport: 'engine.io' });
  Instance.websocket.use('emitter', Emitter);

  Instance.init = function(done) {

    require('./helpers.js')(Instance);
    require('./routes.js')(Instance);
    require('./models.js')(Instance);
    require('./socket.js')(Instance);

    done(Instance);
  }

  return Instance;
};