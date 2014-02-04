module.exports = function(Instance) {
  'use strict';
  
  Instance.websocket.on('connection', function(socket) {

    Instance.socketConnections.push(socket);

    socket.on('getAdvertById', function(id, callback) {
      Instance.server.helpers.getAdvertById(id, callback);
    });

    socket.on('getAllAdverts', function(options, callback) {
      Instance.server.helpers.getAllAdverts(callback);
    });

    socket.on('saveAdvert', function(options, callback) {
      Instance.server.helpers.saveAdvert(options, callback);
    });

    socket.on('deleteAdvert', function(options, callback) {
      Instance.server.helpers.deleteAdvert(options, callback);
    });

    socket.on('incrementAdvertView', function(options, callback) {
      Instance.server.helper.incrementAdvertView(options, callback);
    });

    socket.on('end', function() {
      var clientsSocketIndex = Instance.socketConnections.indexOf(socket);
      if ((socket) && (clientsSocketIndex !== -1)) {
        Instance.socketConnections.splice(clientsSocketIndex, 1);
      }
    });

  });
};