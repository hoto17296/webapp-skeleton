const fs = require('fs');
const db = require('../stores/db');

const query = fs.readFileSync(`${__dirname}/../config/schema.sql`, 'utf-8');
db.query(query)
  .then(() => { console.log('ok'); process.exit(); })
  .catch((e) => { console.error(e.message); process.exit(); });

process.on('SIGINT', () => process.exit());
