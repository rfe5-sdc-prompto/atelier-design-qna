const express = require('express');
const path = require('path');

let app = express();

app.use(express.json());
// app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('*', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
