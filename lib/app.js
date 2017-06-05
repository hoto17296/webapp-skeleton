const express = require('express');

const app = express();

app.locals.sitename = 'WebApp Skeleton';

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('../stores/redis');

app.use(session({
  store: new RedisStore({ client: redis }),
  key: 'session_id',
  secret: process.env.SECRET_KEY,
}));

const Auth = require('./auth').Auth;

Auth.required = function (req, res, next) {
  if (req.auth.authorized) next();
  else res.redirect('/signin');
};

app.use((req, res, next) => {
  req.auth = new Auth(req.session);
  req.auth.authorize().then(next).catch((e) => {
    console.error(e);
    res.sendStatus(500);
  });
  res.locals.auth = req.auth;
});

app.set('view engine', 'ejs');

app.get('/', Auth.required, (req, res) => res.render('index', { title: 'Home' }));

app.use('/', require('../routes/auth'));

module.exports = app;
