var Hapi = require('hapi');
var uid = require('uid');

module.exports = function(Instance) {
  'use strict';

  var getAllAdverts = function(callback) {
    Instance.db.Advert.all(function(err, adverts) {
      if (err) {
        return callback(Hapi.error.badRequest(err));
      }
      callback(adverts);
    });
  };
  Instance.server.helper('getAllAdverts', getAllAdverts, {
    cache: { expiresIn: 2000 }
  });

  var getAdvertById = function(id, callback) {
    Instance.db.Advert.find(id, function(err, advert) {
      if (err) {
        return callback(Hapi.error.badRequest(err));
      }

      if (advert === false) {
        return callback(Hapi.error.notFound(err));
      }

      callback(advert);
    });
  };
  Instance.server.helper('getAdvertById', getAdvertById, {
    cache: { expiresIn: 2000 }
  });

   var getAdvertByShortcode = function(shortcode, callback) {
    Instance.db.Advert.find({shortcode: shortcode}, function(err, advert) {
      if (err) {
        return callback(Hapi.error.badRequest(err));
      }

      if (advert === false) {
        return callback(Hapi.error.notFound(err));
      }
      
      callback(advert);
    });
  };
  Instance.server.helper('displayAd', getAdvertByShortcode, {
    cache: { expiresIn: 5000 }
  });

  var saveAdvert = function(advert, callback) {
    var ad = new Instance.db.Advert(advert);

    var generateUniqueId = function() {
      var id = uid(10);
      for (var i = 0, j = id.length; i < j; i++) {
        if (id[i] === id[i+1]) {
          return generateUniqueId();
        }
      }
      return id;
    };

    ad.id(ad.id() || generateUniqueId());
    ad.views(ad.views() || 0);

    ad.save(function(err, updated) {
      if (err) {
        return callback(Hapi.error.badRequest(err));
      }

      callback(updated);
    });
  };
  Instance.server.helper('saveAdvert', saveAdvert);

  var deleteAdvert = function(advert, callback) {
    var ad = new Instance.db.Advert(advert);

    ad.remove(function(err, updated) {
      if (err) {
        return callback(Hapi.error.badRequest(err));
      }
      callback(updated);
    });
  };
  Instance.server.helper('deleteAdvert', deleteAdvert);

  var incrementAdvertView = function(id, callback) {
    Instance.db.Advert.find(id, function(err, ad) {
      if (err) {
        return callback(Hapi.error.notFound(err));
      }
      ad.views(ad.views() + 1);
      ad.save(function(err) {
        if (err) {
          return callback(Hapi.error.badRequest(err));
        }
        callback(ad);
      });
    });
  };
  Instance.server.helper('incrementAdvertView', incrementAdvertView);
  
}