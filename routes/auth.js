const router = require('express').Router();
const { Auth, AuthError } = require('../lib/auth');

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

  return Auth.register(body.username, body.password1)
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

module.exports = router;
