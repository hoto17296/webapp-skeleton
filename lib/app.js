const express = require('express');

const app = express();

const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('../stores/redis');

app.use(session({
  store: new RedisStore({ client: redis }),
  key: 'session_id',
  secret: process.env.SECRET_KEY,
}));

app.get('/', (req, res) => res.sendStatus(200));

module.exports = app;
