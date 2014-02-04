var Modella = require('modella');

module.exports = function(Instance) {

  Instance.db.Advert = Modella('advert')
                       .attr('_id')
                       .attr('shortcode')
                       .attr('url')
                       .attr('views')
                       .use(Instance.db._connection)
}