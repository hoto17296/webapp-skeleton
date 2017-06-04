const pg = require('pg');

const connection = new Promise((resolve, reject) => {
  pg.connect(process.env.DATABASE_URL, (err, client) => err ? reject(err) : resolve(client));
});

connection.catch((e) => { throw e; });

module.exports = {
  query(text, values, one = false) {
    return new Promise((resolve, reject) => {
      connection.then((client) => {
        client.query(text, values, (err, res) => {
          if (err) return reject(err);
          const data = one ? res.rows[0] : res.rows;
          return resolve(data, res);
        });
      });
    });
  },
};
