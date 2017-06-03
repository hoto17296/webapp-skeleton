const express = require('express');

const app = express();

app.locals.sitename = 'WebApp Skeleton';

const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('../stores/redis');

app.use(session({
  store: new RedisStore({ client: redis }),
  key: 'session_id',
  secret: process.env.SECRET_KEY,
}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => res.sendStatus(200));

app.use('/', require('../routes/auth'));

module.exports = app;
