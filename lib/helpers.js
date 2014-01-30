var Hapi = require('hapi');

module.exports = function(Instance) {

  var getAllAdverts = function(callback) {
    Instance.db.Advert.all(function(err, adverts) {
      if (err) {
        return callback(Hapi.error.badRequest(err));
      }
      callback(adverts);
    });
  };

  Instance.server.helper('adverts', getAllAdverts, {
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
  }

  Instance.server.helper('advert', getAdvertById, {
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
  }

  Instance.server.helper('displayAd', getAdvertByShortcode, {
    cache: { expiresIn: 5000 }
  });

  var newAdvert = function(advert, callback) {
    var ad = new Instance.db.Advert(advert);

    ad.save(function(err, updated) {
      if (err) {
        return callback(Hapi.error.badRequest(err));
      }

      callback(updated);
    });
  };

  Instance.server.helper('newAdvert', newAdvert);
  
}