const router = require('express').Router();
const AuthError = require('../lib/auth').AuthError;

router.get('/signup', (req, res) => {
  const [title, body, errors] = ['Sign up', {}, []];
  return res.render('auth/signup', { title, body, errors });
});

router.post('/signup', (req, res) => {
  const [title, body, errors] = ['Sign up', req.body, []];

  if (body.password1 !== body.password2) {
    errors.push('Passwords don\'t match');
    return res.render('auth/signup', { title, body, errors });
  }

  return req.auth.register(body.username, body.password1)
    .then(() => req.auth.signin(body.username, body.password1))
    .then(() => res.redirect('/'))
    .catch((e) => {
      if (e instanceof AuthError) {
        errors.push(e.message);
        res.render('auth/signup', { title, body, errors });
      } else {
        console.error(e);
        res.sendStatus(500);
      }
    });
});

router.get('/signin', (req, res) => {
  const [title, body, errors] = ['Sign in', {}, []];
  return res.render('auth/signin', { title, body, errors });
});

router.post('/signin', (req, res) => {
  const [title, body, errors] = ['Sign in', req.body, []];

  return req.auth.signin(body.username, body.password)
    .then(() => res.redirect('/'))
    .catch((e) => {
      if (e instanceof AuthError) {
        errors.push(e.message);
        res.render('auth/signin', { title, body, errors });
      } else {
        console.error(e);
        res.sendStatus(500);
      }
    });
});

router.get('/signout', (req, res) => {
  req.auth.signout();
  res.redirect('/signin');
});

module.exports = router;
