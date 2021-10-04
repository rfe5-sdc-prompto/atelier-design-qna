const { answers, photos } = require('../models/index');
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
  post: (req, res) => {
    let dataArray = [
      req.params.question_id,
      req.body.body,
      req.body.name,
      req.body.email,
      new Date().getTime(),
      0,
      0,
    ];
    answers
      .create(dataArray)
      .then((data) => {
        console.log('RETURNED', data.rows);
        console.log('PHOTOS', req.body.photos);
        req.body.photos.forEach((photo) => {
          let photoDataArray = [data.rows[0].id, photo];
          photos.create(photoDataArray).catch((err) => {
            console.error('Error: ', err);
          });
        });
        return data;
      })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  },
  put: (req, res) => {
    let dataArray = [req.params.answer_id];
    answers
      .updateHelpful(dataArray)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  },
  report: (req, res) => {
    let dataArray = [req.params.answer_id];
    answers
      .report(dataArray)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        console.error('Error: ', err);
      });
  },
};
