const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.DB_USER || 'ubuntu',
  password: process.env.DB_PASSWORD || 'ubuntu',
  database: process.env.DB_DATABASE || 'qna',
  host: process.env.DB_HOST || '18.220.107.64',
  port: process.env.PORT || 5432,
});

module.exports = pool;
