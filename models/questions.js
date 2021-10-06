const pool = require('./db');

module.exports = {
  readAll: (callback) => {
    const queryString = 'SELECT * FROM questions LIMIT 10';
    pool.query(queryString, callback);
  },
  readOne: (id, callback) => {
    const queryString = 'SELECT * FROM questions WHERE id = ?';
    pool.query(queryString, id, callback);
  },
  create: (dataArray, callback) => {
    const queryString = 'INSERT INTO questions (name, description) VALUES (?, ?)';
    pool.query(queryString, dataArray, callback);
  },
  update: (dataArray, callback) => {
    const queryString =
      'UPDATE questions SET name = ?, description = ? WHERE id = ?';
    pool.query(queryString, dataArray, callback);
  },
  delete: (id, callback) => {
    const queryString = 'DELETE FROM questions WHERE id = ?';
    pool.query(queryString, id, callback);
  },
};
