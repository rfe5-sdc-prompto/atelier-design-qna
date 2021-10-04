const pool = require('../db');

module.exports = {
  create: (dataArray) => {
    const queryString = `
    INSERT INTO photos (answer_id, photourl)
    VALUES ($1, $2)
    `;
    return pool
      .query(queryString, dataArray)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  },
};
