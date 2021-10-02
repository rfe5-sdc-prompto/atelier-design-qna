const pool = require('../db');

const readAll = (dataArray, callback) => {
  const queryString = 'SELECT * FROM questions WHERE product_id = $1 LIMIT $2';
  pool
    .query(queryString, dataArray)
    .then((questions) => {
      const queryString = 'SELECT * FROM answers WHERE question_id = $1';
      let questionsWithAnswers = questions.rows.map((question) => {
        return pool
          .query(queryString, [question.id])
          .then((answers) => {
            const queryString = 'SELECT * FROM photos WHERE answer_id = $1';
            let answerWithPhotos = answers.rows.map((answer) => {
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
            question.answers = answers.rows;
            return question;
          })
          .catch((err) => {
            console.error('Error: ', err);
          });
      });
      return Promise.all(questionsWithAnswers);
    })
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {
      callback(err);
    });
};

const readAllWithAnswers = (dataArray, callback) => {
  const queryString = `
  SELECT *
  FROM questions
  LEFT OUTER JOIN answers
  ON (questions.id = answers.question_id)
  WHERE product_id = $1
  EXCEPT
  SELECT *
  FROM questions
  LEFT OUTER JOIN answers
  ON (questions.id = answers.question_id)
  WHERE questions.reported = 1 OR answers.reported = 1
  LIMIT $2
  `;
  pool
    .query(queryString, dataArray)
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports = {
  readAll: readAll,
  readAllWithAnswers: readAllWithAnswers,
  // readOne: (id, callback) => {
  //   const queryString = 'SELECT * FROM questions WHERE id = ?';
  //   pool.query(queryString, id, callback);
  // },
  // create: (dataArray, callback) => {
  //   const queryString = 'INSERT INTO questions (name, description) VALUES (?, ?)';
  //   pool.query(queryString, dataArray, callback);
  // },
  // update: (dataArray, callback) => {
  //   const queryString =
  //     'UPDATE questions SET name = ?, description = ? WHERE id = ?';
  //   pool.query(queryString, dataArray, callback);
  // },
  // delete: (id, callback) => {
  //   const queryString = 'DELETE FROM questions WHERE id = ?';
  //   pool.query(queryString, id, callback);
  // },
};
