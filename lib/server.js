const app = require('./app');
const server = require('http').Server(app);
require('./io')(server);

server.start = function (port) {
  port = port || process.env.PORT; // eslint-disable-line no-param-reassign
  server.listen(port, () => console.log(`Server starting on http://localhost:${port}/`));
};

module.exports = server;
