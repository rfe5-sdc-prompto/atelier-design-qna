const pool = require('../db');

const readAll = (dataArray) => {
  const queryString = `
  SELECT answers.id, answers.body, answers.date_written, answers.answerer_name, answers.helpful
  FROM answers
  WHERE question_id = $1
  EXCEPT
  SELECT answers.id, answers.body, answers.date_written, answers.answerer_name, answers.helpful
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
  INSERT INTO answers (question_id, body, answerer_name, answerer_email, date_written, helpful, reported)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
  RETURNING answers.id
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
