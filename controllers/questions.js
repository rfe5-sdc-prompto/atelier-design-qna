const { questions, answers } = require('../models/index');
const transformer = require('./transformer');

module.exports = {
  get: (req, res) => {
    let id = req.query.product_id;
    let count = req.query.count || 5;
    let page = req.query.page || 1;
    questions
      .readAll([id, count])
      .then((data) => {
        res.send(transformer.questions(id, data));
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  },
  post: (req, res) => {
    let dataArray = [
      req.body.product_id,
      req.body.body,
      req.body.name,
      req.body.email,
      new Date().getTime(),
      0,
      0,
    ];
    questions
      .create(dataArray)
      .then((data) => {
        res.status(201).send(data);
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  },
  put: (req, res) => {
    let dataArray = [req.params.question_id];
    questions
      .updateHelpful(dataArray)
      .then((data) => {
        res.status(204).send(data);
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
        res.status(204).send(data);
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  },
};
