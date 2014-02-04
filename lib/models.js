var Modella = require('modella');

module.exports = function(Instance) {

  Instance.db.Advert = Modella('advert')
                       .attr('id')
                       .attr('url')
                       .attr('views')
                       .use(Instance.db._connection)
}