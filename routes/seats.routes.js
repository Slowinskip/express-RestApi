const express = require('express');
const uuid = require('uuid').v4;
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
  const { day, seat, client, email } = req.body;
  const id = uuid();

  const newseats = {
    id: id,
    day: day,
    seat: seat,
    client: client,
    email: email,
    };

  db.seats.push(newseats);
  res.json({ message: 'ok' });
});

router.route('/seats/:id').put((req, res) => {
  const id = req.params.id;
  const findseats = db.seats.find((data) => data.id == id);
  const index = db.seats.indexOf(findseats);
  const { day, seat, client, email } = req.body;
  const changeseats = {
    id: id,
    day: day,
    seat: seat,
    client: client,
    email: email, 
  };
  if (
    !db.seats.some(
      (seat) => seat.day == newSeat.day && seat.seat == newSeat.seat
    )
  ) {
    db.seats.push(newSeat);
    req.io.emit('seatsUpdated', db.seats);
    res.json({ message: 'ok' });
  } else {
    res.json({ message: 'The slot is already taken...' });
    res.status(409).json({ message: 'The slot is already taken...' });
  }

  
});

router.route('/seats/:id').delete((req, res) => {
  const element = db.seats.find((data) => data.id == req.params.id);
  const index = db.seats.indexOf(element);

  db.seats.splice(index, 1);
  res.json({ message: 'ok' });
});

module.exports = router;