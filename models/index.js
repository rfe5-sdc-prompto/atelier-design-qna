const pool = require('./db');

module.exports = {
  readAll: (callback) => {
    const queryString = 'SELECT * FROM cows LIMIT 10';
    pool.query(queryString, callback);
  },
  readOne: (id, callback) => {
    const queryString = 'SELECT * FROM cows WHERE id = ?';
    pool.query(queryString, id, callback);
  },
  create: (dataArray, callback) => {
    const queryString = 'INSERT INTO cows (name, description) VALUES (?, ?)';
    pool.query(queryString, dataArray, callback);
  },
  update: (dataArray, callback) => {
    const queryString =
      'UPDATE cows SET name = ?, description = ? WHERE id = ?';
    pool.query(queryString, dataArray, callback);
  },
  delete: (id, callback) => {
    const queryString = 'DELETE FROM cows WHERE id = ?';
    pool.query(queryString, id, callback);
  },
};
