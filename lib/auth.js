const crypto = require('crypto');
const db = require('../stores/db');

class AuthError extends Error {

  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

}

class Auth {

  constructor(session, key = 'user_id') {
    this.session = session;
    this.key = key;
    this.secret = process.env.SECRET_KEY;
    this.user = null;
    this.authorized = false;
  }

  authorize() {
    if (!this.session[this.key]) return Promise.resolve();
    const query = 'SELECT * FROM users WHERE id = $1::int LIMIT 1';
    return db.query(query, [this.session[this.key]], true).then((row) => {
      this.user = row || null;
      this.authorized = !!row;
    });
  }

  hash(password) {
    return crypto.createHmac('sha256', this.secret).update(password).digest('hex');
  }

  register(username, password) {
    if (!/^[a-zA-Z0-9_-]{3,}$/.test(username)) {
      return Promise.reject(new AuthError('Invalid username'));
    }
    if (!/^[\x21-\x7e]{6,}$/i.test(password)) {
      return Promise.reject(new AuthError('Password must be at least 6 characters'));
    }
    const query = 'SELECT * FROM users WHERE username = $1::text LIMIT 1';
    return db.query(query, [username], true).then((user) => {
      if (user) return Promise.reject(new AuthError('This username is already taken'));
      const query = 'INSERT INTO users (username, pw_hash) VALUES ($1::text, $2::text)';
      return db.query(query, [username, this.hash(password)]);
    });
  }

  signin(username, password) {
    const query = 'SELECT * FROM users WHERE username = $1::text AND pw_hash = $2::text LIMIT 1';
    return db.query(query, [username, this.hash(password)], true).then((user) => {
      if (!user) return Promise.reject(new AuthError('Username or password is incorrect'));
      this.session[this.key] = user.id;
      this.user = user;
      this.authorized = true;
      return Promise.resolve();
    });
  }

  signout() {
    this.session[this.key] = undefined;
    this.user = null;
    this.authorized = false;
  }

}

module.exports = { Auth, AuthError };
