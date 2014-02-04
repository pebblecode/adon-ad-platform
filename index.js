var Confidence = require('confidence');
var server = require('./lib/server.js');

// The basic configuration
var options = {
  server: {
    $filter: 'env',
    production: {
      host: '0.0.0.0',
      port: process.env.PORT,
      files: {
        relativeTo: __dirname + '/public'
      }
    },
    $default: {
      host: '0.0.0.0',
      port: 8001,
      files: {
        relativeTo: __dirname + '/public'
      }
    }
  },
  database: {
    $filter: 'env',
    production: {
      mongo: {
        connectionString: process.env.MONGOLAB_URI
      },
      leveldb: {
        connectionString: __dirname + '/database/ad-platform'
      }
    },
    $default: {
      mongo: {
        connectionString: 'localhost/ad-platform'
      },
      leveldb: {
        connectionString: __dirname + '/database/ad-platform'
      }
    }
  }
}

var optionsStore = new Confidence.Store(options);
var guid = Confidence.id.generate();
var criteria = Confidence.id.criteria(guid);

if (criteria === null) {
  console.error('Bad ID');
  process.exit(1);
}
criteria.env = process.env.NODE_ENV || 'development';
var config = optionsStore.get('/', criteria);

// Lets start the server
// Bootstrap routes to server
server(config).init(function(Instance) {
  Instance.server.on('log', function(event, tags) {
    if (tags.error) {
      console.error(event.timestamp + ': [error] ' + event.data);
    }
    if (tags.debug) {
      console.log(event.timestamp + ': [debug] ' + event.data);
    }
  });
  
  Instance.server.start(function(error) {
    Instance.server.log(['debug'], 'Server Started - ' + Instance.config.server.host + ':' + Instance.config.server.port);
  });  
});