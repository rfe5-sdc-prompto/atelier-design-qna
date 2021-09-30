const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'chris2',
  password: 'password',
  database: 'qna',
  host: 'localhost',
  port: 5432,
});

module.exports = pool;
