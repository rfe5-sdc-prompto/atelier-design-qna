const express = require('express');
const path = require('path');
const { questions, answers } = require('./controllers/index');

let app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/qa/questions', (req, res) => {
  questions.get(req, res);
});
app.get('/qa/questions/:question_id/answers', (req, res) => {
  answers.get(req, res);
});

module.exports = app;
