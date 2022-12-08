const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();

const testimonials = require('./routes/testimonials.routes.js');
const concerts = require('./routes/concerts.routes.js');
const seats = require('./routes/seats.routes.js');
const workshops = require('./routes/workshop.routes.js');

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api', testimonials);
app.use('/api', concerts);
app.use('/api', seats);
app.use('/api', workshops);


app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
});

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New socket');
});

mongoose.connect('mongodb+srv://patryk_slowinski:DaciaSandero123@cluster0.iqjsj6s.mongodb.net/festical');
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));