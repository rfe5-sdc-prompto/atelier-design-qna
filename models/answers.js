const pool = require('../db');

const readAll = (dataArray) => {
  const queryString = `
  SELECT * FROM answers
  WHERE question_id = $1
  EXCEPT
  SELECT *
  FROM answers
  WHERE answers.reported = 1
  LIMIT $2
  `;
  return pool
    .query(queryString, dataArray)
    .then((answers) => {
      const queryString =
        'SELECT id, photourl FROM photos WHERE answer_id = $1';
      return answers.rows.map((answer) => {
        return pool
          .query(queryString, [answer.id])
          .then((photos) => {
            answer.photos = photos.rows;
            return answer;
          })
          .catch((err) => {
            console.error('Error: ', err);
          });
      });
    })
    .then((answers) => {
      return Promise.all(answers);
    })
    .catch((err) => {
      console.error('Error: ', err);
    });
};

const create = (dataArray) => {
  const queryString = `
  INSERT INTO questions (product_id, body, asker_name, asker_email)
  VALUES ($1, $2, $3, $4)
  `;
  return pool
    .query(queryString, dataArray)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error('Error: ', err);
    });
};

const updateHelpful = (dataArray) => {
  const queryString = `
  UPDATE answers
  SET helpful = helpful + 1
  WHERE id = $1
  `;
  return pool
    .query(queryString, dataArray)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error('Error: ', err);
    });
};

const report = (dataArray) => {
  const queryString = `
  UPDATE answers
  SET reported = 1
  WHERE id = $1
  `;
  return pool
    .query(queryString, dataArray)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error('Error: ', err);
    });
};

module.exports = {
  readAll: readAll,
  create: create,
  updateHelpful: updateHelpful,
  report: report,
};
