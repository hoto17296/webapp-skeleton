class Auth {

  static register(username, password) {
    if (!/^[a-zA-Z0-9_-]{3,}$/.test(username)) throw new AuthError('Invalid username');
    if (!/^[\x21-\x7e]{6,}$/i.test(password)) throw new AuthError('Password must be at least 6 characters');
    // TODO register
  }

}

class AuthError extends Error {

  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

}

module.exports = { Auth, AuthError };
