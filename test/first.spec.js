var assert = require('assert');
var server = require('./../lib/server');

describe('First', function() {

  var Instance;

  before(function(done) {
    server({
      server: {
        host: '0.0.0.0',
        port: 8001,
        files: {
          relativeTo: __dirname + '/public'
        }
      }
    }).init(function(instance) {
      Instance = instance;
      done();
    });
  });

  it('should serve a json object', function(done) {
    Instance.server.inject({
      method: 'GET',
      url: '/'
    }, function(response) {
      assert.equal(JSON.parse(response.payload).hello, 'you');
      done();
    });
  });
});