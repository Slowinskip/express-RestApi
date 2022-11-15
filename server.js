const express = require('express');
const cors = require('cors');
const db = require('./db.js');

const app = express();

// import routes
const testimonials = require('./routes/testimonials.routes.js');
const concerts = require('./routes/concerts.routes.js');
const seats = require('./routes/seats.routes.js');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.use('/api', testimonials);
app.use('/api', concerts);
app.use('/api', seats);





app.use((req, res) => {
    res.status(404).send('Not found...');
  })

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
  });