const pool = require('../db');

const readAll = (dataArray) => {
  const queryString = 'SELECT * FROM questions WHERE product_id = $1 LIMIT $2';
  return pool
    .query(queryString, dataArray)
    .then((questions) => {
      const queryString = 'SELECT * FROM answers WHERE question_id = $1';
      return questions.rows.map((question) => {
        return pool
          .query(queryString, [question.id])
          .then((answers) => {
            const queryString =
              'SELECT photourl FROM photos WHERE answer_id = $1';
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
          .then((answers) => {
            question.answers = answers;
            return question;
          })
          .catch((err) => {
            console.error('Error: ', err);
          });
      });
    })
    .then((data) => {
      return Promise.all(data);
    })
    .catch((err) => {
      console.error('Error: ', err);
    });
  // .then((data) => cb(null, data))
  // .catch((err) => {
  //   callback(err);
  // });
};

const readAllWithAnswers = (dataArray) => {
  const queryString = `
  SELECT questions.id, questions.body, questions.date_written, questions.asker_name, questions.helpful, questions.reported,



  FROM questions
  LEFT OUTER JOIN answers
  ON (questions.id = answers.question_id)
  WHERE product_id = $1
  LEFT OUTER JOIN photos
  ON (answers.id = photos.answer_id)
  EXCEPT
  SELECT *
  FROM questions
  LEFT OUTER JOIN answers
  ON (questions.id = answers.question_id)
  WHERE questions.reported = 1 OR answers.reported = 1
  LIMIT $2
  `;
  return pool
    .query(queryString, dataArray)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
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
