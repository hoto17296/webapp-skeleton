const router = require('express').Router();
const { Auth, AuthError } = require('../lib/auth');

router.all('/signup', (req, res) => {
  const errors = [];
  const body = req.body;

  if (req.method == 'POST') {
    if (body.password1 != body.password2) {
      errors.push('Passwords don\'t match');
    }
    else {
      try {
        Auth.register(body.username, body.password1);
        return res.redirect('/');
      }
      catch(e) {
        if (e instanceof AuthError) errors.push(e.message);
        else throw e;
      }
    }
  }

  return res.render('auth/signup', { title: 'Sign up', body, errors });
});

module.exports = router;
