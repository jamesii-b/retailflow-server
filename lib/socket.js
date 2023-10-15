// socket/socket.js
const socketIo = require('socket.io');

function initializeWebSocket(server) {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('A user connected to WebSocket');

    // Handle WebSocket events here
    socket.on('disconnect', () => {
      console.log('A user disconnected from WebSocket');
    });
  });

  return io;
}

module.exports = initializeWebSocket;
// Path: server.js