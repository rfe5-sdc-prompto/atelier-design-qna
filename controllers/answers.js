const { answers } = require('../models/index');
const transformer = require('./transformer');

module.exports = {
  get: (req, res) => {
    let questionId = req.params.question_id;
    let page = req.query.page || 1;
    let count = req.query.count || 10;
    answers
      .readAll([questionId, count])
      .then((data) => {
        res.send(transformer.answers(questionId, page, count, data));
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  },
  // post: (req, res) => {
  //   let dataArray = [name, description];
  //   questions.create(dataArray, (err, data) => {
  //     if (err) {
  //       console.error('Error: ', err);
  //       res.status(500).end();
  //     }
  //     questions.readOne(data.insertId, (err, data) => {
  //       if (err) {
  //         console.error('Error: ', err);
  //         res.status(500).end();
  //       }
  //       res.json(data);
  //     });
  //   });
  // },
  post: (req, res) => {
    console.log(req.body, req.params);
    let dataArray = [
      req.body.body,
      req.body.name,
      req.body.email,
      req.body.photos,
    ];
    questions
      .create(dataArray)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
    res.end();
  },
  put: (req, res) => {
    let dataArray = [req.params.question_id];
    questions
      .updateHelpful(dataArray)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  },
  report: (req, res) => {
    let dataArray = [req.params.question_id];
    questions
      .report(dataArray)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  },
};
