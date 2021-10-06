const pool = require('../db');

const readAll = (dataArray) => {
  const queryString = `
  SELECT questions.id, questions.body, questions.date_written, questions.asker_name, questions.helpful, questions.reported
  FROM questions
  WHERE product_id = $1
  EXCEPT
  SELECT questions.id, questions.body, questions.date_written, questions.asker_name, questions.helpful, questions.reported
  FROM questions
  WHERE questions.reported = 1
  LIMIT $2
  `;
  return pool
    .query(queryString, dataArray)
    .then((questions) => {
      const queryString = `
      SELECT answers.id, answers.body, answers.date_written, answers.answerer_name, answers.helpful
      FROM answers
      WHERE question_id = $1
      EXCEPT
      SELECT answers.id, answers.body, answers.date_written, answers.answerer_name, answers.helpful
      FROM answers
      WHERE answers.reported = 1
      `;
      return questions.rows.map((question) => {
        return pool
          .query(queryString, [question.id])
          .then((answers) => {
            const queryString = `
            SELECT photourl FROM photos
            WHERE answer_id = $1
            `;
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
};

const create = (dataArray) => {
  const queryString = `
  INSERT INTO questions (product_id, body, asker_name, asker_email, date_written, helpful, reported)
  VALUES ($1, $2, $3, $4, $5, $6, $7)
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
  UPDATE questions
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
  UPDATE questions
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

// const readAllWithAnswers = (dataArray) => {
//   const queryString = `
//   SELECT
//   questions.id, questions.body, questions.date_written, questions.asker_name, questions.helpful, questions.reported,
//   FROM questions
//   LEFT OUTER JOIN answers
//   ON (questions.id = answers.question_id)
//   WHERE product_id = $1
//   LEFT OUTER JOIN photos
//   ON (answers.id = photos.answer_id)
//   EXCEPT
//   SELECT *
//   FROM questions
//   LEFT OUTER JOIN answers
//   ON (questions.id = answers.question_id)
//   WHERE questions.reported = 1 OR answers.reported = 1
//   LIMIT $2
//   `;
//   return pool
//     .query(queryString, dataArray)
//     .then((data) => {
//       return data;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

module.exports = {
  readAll: readAll,
  create: create,
  updateHelpful: updateHelpful,
  report: report,
  // readAllWithAnswers: readAllWithAnswers
};
