const express = require('express');
const uuidv4 = require('uuid');
const db = require('../db.js');

const router = express.Router();

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  res.json(db.seats.find((data) => data.id == req.params.id));
});

router.route('/seats/random').get((req, res) => {
  res.json(db.seats[Math.floor(Math.random() * db.seats.length)]);
});

router.route('/seats').post((req, res) => {
  const { author, text } = req.body;
  const id = uuidv4();

  const newseats = {
    id: id,
    author: author,
    text: text,
  };

  db.seats.push(newseats);
  res.json({ message: 'ok' });
});

router.route('/seats/:id').put((req, res) => {
  const id = req.params.id;
  const findseats = db.seats.find((data) => data.id == id);
  const index = db.seats.indexOf(findseats);
  const { author, text } = req.body;
  const changeseats = {
    id: id,
    author: author,
    text: text,
  };

  db.seats[index] = changeseats;
  res.json({ message: 'ok' });
});

router.route('/seats/:id').delete((req, res) => {
  const element = db.seats.find((data) => data.id == req.params.id);
  const index = db.seats.indexOf(element);

  db.seats.splice(index, 1);
  res.json({ message: 'ok' });
});

module.exports = router;