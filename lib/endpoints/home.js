module.exports = function(Instance) {

  return {
    handler: function(request, reply) {
      reply({hello: 'you', config: Instance.config});
    }

  };
};