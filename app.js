const express = require('express');
const path = require('path');
const { questions, answers } = require('./controllers/index');
const loaderToken = require('./loaderTest.txt');

let app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/qa/questions', (req, res) => {
  questions.get(req, res);
});
app.post('/qa/questions', (req, res) => {
  questions.post(req, res);
});
app.put('/qa/questions/:question_id/helpful', (req, res) => {
  questions.put(req, res);
});
app.put('/qa/questions/:question_id/report', (req, res) => {
  questions.report(req, res);
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  answers.get(req, res);
});
app.post('/qa/questions/:question_id/answers', (req, res) => {
  answers.post(req, res);
});
app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  answers.put(req, res);
});
app.put('/qa/answers/:answer_id/report', (req, res) => {
  answers.report(req, res);
});

app.get(
  `http://ec2-18-118-110-187.us-east-2.compute.amazonaws.com/loaderio-2f9d306f2ea37455b086496afd2ad3bd.txt`,
  (req, res) => {
    res.send(loaderToken);
  }
);

module.exports = app;
