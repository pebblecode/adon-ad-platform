module.exports = function(Instance) {
  'use strict';

  // Static Handlers
  Instance.server.route({
    method: 'GET',
    path: '/images/{file*}',
    config: { handler: { directory: { path: './images', listing: true } } }
  });
  Instance.server.route({
    method: 'GET',
    path: '/css/{file*}',
    config: { handler: { directory: { path: './css', listing: true } } }
  });
  Instance.server.route({
    method: 'GET',
    path: '/js/{file*}',
    config: { handler: { directory: { path: './js', listing: false } } }
  });
  Instance.server.route({
    method: 'GET',
    path: '/templates/{file*}',
    config: { handler: { directory: { path: './templates', listing: false } } }
  });
  Instance.server.route({
    method: 'GET',
    path: '/includes/{file*}',
    config: { handler: { directory: { path: './includes', listing: false } } }
  });

  Instance.server.route({
    method: 'GET',
    path: '/',
    config: { handler: { file: { path: './index.html' } } }
  });

  Instance.server.route({
    method: 'GET',
    path: '/api/adverts',
    config: {
      handler: function(request, reply) {
        Instance.server.helpers.getAllAdverts(function(result) {
          reply(result);
        })
      }
    }
  });

  Instance.server.route({
    method: 'PUT',
    path: '/api/adverts',
    config: {
      handler: function(request, reply) {
        Instance.server.helpers.newAdvert(request.payload, function(result) {
          reply(result);
        })
      }
    }
  });

  Instance.server.route({
    method: 'GET',
    path: '/api/adverts/{id}',
    config: {
      handler: function(request, reply) {
        Instance.server.helpers.advert(request.params.id, function(result) {
          reply(result);
        })
      }
    }
  });

  Instance.server.route({
    method: 'GET',
    path: '/ad/{shortcode}',
    config: {
      handler: function(request, reply) {
        Instance.server.helpers.displayAd(request.params.shortcode, function(result) {
          reply(result);
        })
      }
    }
  });
  
};