const express = require('express');
const { uuid } = require('uuidv4');
const db = require('../db.js');

const router = express.Router();

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  res.json(db.concerts.find((data) => data.id == req.params.id));
});

router.route('/concerts/random').get((req, res) => {
  res.json(db.concerts[Math.floor(Math.random() * db.concerts.length)]);
});

router.route('/concerts').post((req, res) => {
  const { author, text } = req.body;
  const id = uuid();

  const newconcerts = {
    id: id,
    author: author,
    text: text,
  };

  db.concerts.push(newconcerts);
  res.json({ message: 'ok' });
});

router.route('/concerts/:id').put((req, res) => {
  const id = req.params.id;
  const findconcerts = db.concerts.find((data) => data.id == id);
  const index = db.concerts.indexOf(findconcerts);
  const { author, text } = req.body;
  const changeconcerts = {
    id: id,
    author: author,
    text: text,
  };

  db.concerts[index] = changeconcerts;
  res.json({ message: 'ok' });
});

router.route('/concerts/:id').delete((req, res) => {
  const element = db.concerts.find((data) => data.id == req.params.id);
  const index = db.concerts.indexOf(element);

  db.concerts.splice(index, 1);
  res.json({ message: 'ok' });
});

module.exports = router;