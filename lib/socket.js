module.exports = function(Instance) {
  
  Instance.websocket.on('connection', function(socket) {

    Instance.socketConnections.push(socket);

    socket.on('validateAdvertId', function(id, callback) {
      Instance.server.helpers.displayAd(id, callback);
    });

    socket.on('end', function() {
      var clientsSocketIndex = Instance.socketConnections.indexOf(socket);
      if ((socket) && (clientsSocketIndex !== -1)) {
        Instance.socketConnections.splice(clientsSocketIndex, 1);
      }
    });

  });
};