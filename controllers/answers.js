const { answers } = require('../models/index');
const transformer = require('./transformer');

module.exports = {
  get: (req, res) => {
    let questionId = req.params.question_id;
    let page = req.query.page || 1;
    let count = req.query.count || 5;
    answers.readAll([questionId, count], (err, data) => {
      if (err) {
        console.error('Error: ', err);
        res.end();
      }
      //res.json(transformer.answers(questionId, page, count, data));
      res.json(data);
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
  // put: (req, res) => {
  //   let dataArray = [id];
  //   questions.update(dataArray, (err, data) => {
  //     if (err) {
  //       console.error('Error: ', err);
  //       res.status(500).end();
  //     }
  //     res.json(data);
  //   });
  // }
};
