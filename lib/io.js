const SocketIO = require('socket.io');
const session = require('./session');

module.exports = function (server) {
  const io = SocketIO(server);

  io.use((socket, next) => {
    const req = socket.handshake;
    const res = {};
    session(req, res, () => {
      socket.session = req.session; // eslint-disable-line no-param-reassign
      next();
    });
  });

  io.on('connection', (socket) => {
    console.log(socket.session);
  });

  return io;
};
