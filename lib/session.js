const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('../stores/redis');

module.exports = session({
  store: new RedisStore({ client: redis }),
  key: 'session_id',
  secret: process.env.SECRET_KEY,
});
