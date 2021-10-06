const models = require('../models/index.js');

module.exports = {
  get: (req, res) => {
    models.readAll((err, data) => {
      if (err) {
        console.error(err);
      }
      res.json(data);
    });
  },
  post: (req, res) => {
    ({ name, description } = req.body);
    let dataArray = [name, description];
    models.create(dataArray, (err, data) => {
      if (err) {
        console.error(err);
      }
      models.readOne(data.insertId, (err, data) => {
        if (err) {
          console.error(err);
        }
        res.json(data);
      });
    });
  },
  put: (req, res) => {
    ({ name, description } = req.body);
    ({ id } = req.params);
    let dataArray = [name, description, id];
    models.update(dataArray, (err, data) => {
      if (err) {
        console.error(err);
      }
      res.json(data);
    });
  },
  delete: (req, res) => {
    let id = req.params.id;
    models.delete(id, (err, data) => {
      if (err) {
        console.error(err);
      }
      res.json(data);
    });
  },
};
