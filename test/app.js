const assert = require('assert');
const http = require('thip');
const app = require('..');

const PORT = 10080;
const URL_BASE = `http://localhost:${PORT}`;

describe('app', () => {

  before(done => app.listen(PORT, done));

  context('GET /', () => {

    it('should returns 200', () => {
      const url = `${URL_BASE}/`;
      return http.get(url).then(res => assert.equal(res.statusCode, 200));
    });

  });

});
