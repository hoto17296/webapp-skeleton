const router = require('express').Router();

router.get('/signup', (req, res) => {
  res.render('auth/signup', { title: 'Sign up' });
});

module.exports = router;
