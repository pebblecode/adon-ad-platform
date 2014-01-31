var Confidence = require('confidence');
var server = require('./lib/server.js');

// The basic configuration
var options = {
  server: {
    $filter: 'env',
    production: {
      host: '0.0.0.0',
      port: process.env.PORT
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
      connectionString: process.env.MONGOLAB_URI
    },
    $default: {
      connectionString: 'localhost/ad-platform'
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
criteria.env = 'development';
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