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

  static hash(password) {
    return crypto.createHmac('sha256', process.env.SECRET_KEY).update(password).digest('hex');
  }

  static register(username, password) {
    if (!/^[a-zA-Z0-9_-]{3,}$/.test(username)) {
      return Promise.reject(new AuthError('Invalid username'));
    }
    if (!/^[\x21-\x7e]{6,}$/i.test(password)) {
      return Promise.reject(new AuthError('Password must be at least 6 characters'));
    }
    const query = 'SELECT * FROM users WHERE username = $1::text LIMIT 1';
    return db.query(query, [username], true).then((user) => {
      if (!user) return Promise.reject(new AuthError('This username is already taken'));
      const query = 'INSERT INTO users (username, pw_hash) VALUES ($1::text, $2::text)';
      return db.query(query, [username, this.hash(password)]);
    });
  }

}

module.exports = { Auth, AuthError };
