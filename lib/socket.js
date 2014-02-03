module.exports = function(Instance) {
  
  Instance.websocket.on('connection', function(socket) {

    Instance.socketConnections.push(socket);

    socket.on('validateAdvertId', function(id, callback) {
      Instance.server.helpers.displayAd(id, callback);
    });

    socket.on('getAllAdverts', function(options, callback) {
      Instance.server.helpers.getAllAdverts(callback);
    });

    socket.on('newAdvert', function(options, callback) {
      Instance.server.helpers.newAdvert(options, callback);
    });

    socket.on('deleteAdvert', function(options, callback) {
      Instance.server.helpers.deleteAdvert(options, callback);
    });

    socket.on('end', function() {
      var clientsSocketIndex = Instance.socketConnections.indexOf(socket);
      if ((socket) && (clientsSocketIndex !== -1)) {
        Instance.socketConnections.splice(clientsSocketIndex, 1);
      }
    });

  });
};