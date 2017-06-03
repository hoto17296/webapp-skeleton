const router = require('express').Router();
const { Auth, AuthError } = require('../lib/auth');

router.get('/signup', (req, res) => {
  res.render('auth/signup', { title: 'Sign up', body: {}, errors: [] });
});

router.post('/signup', (req, res) => {
  const { username, password1, password2 } = req.body;
  const errors = [];

  // Validation
  if (password1 != password2) errors.push('Passwords don\'t match');

  if (errors.length == 0) {
    try {
      Auth.register(username, password1);
      return res.redirect('/');
    }
    catch(e) {
      if (e instanceof AuthError) errors.push(e.message);
      else throw e;
    }
  }

  return res.render('auth/signup', { title: 'Sign up', body: req.body, errors });
});

module.exports = router;
