const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.DB_USER || 'chris2',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_DATABASE || 'qna',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.PORT || 5432,
});

module.exports = pool;
