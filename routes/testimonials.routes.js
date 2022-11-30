const express = require('express');
const uuid = require('uuidv4');
const db = require('../db.js');
const Testimonials = require('../models/testimonials.model');


const router = express.Router();

router.route('/testimonials').get(async(req, res) => {
  try {
    res.json(await Testimonials.find({}));
  } catch (err) {
    res.status(500).json({ message: err });
  }});

router.route('/testimonials/:id').get(async(req, res) => {
  try {
    const dep = await Testimonials.findById(req.params.id);
    if(!dep) res.status(404).json({ message: 'Not found' });
    else res.json(dep);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }});

router.route('/testimonials/random').get(async(req, res) => {
  try {
    const count = await Testimonials.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const conc = await Testimonials.findOne().skip(rand);
    if (!conc) res.status(404).json({ message: 'Not found' });
    else res.json(conc);
  } catch (err) {
    res.status(500).json({ message: 'OK' });
  }});

router.route('/testimonials').post(async(req, res) => {
try {
  const { author, text } = req.body;
  const newTestimonials = new Testimonials({ author:author, text:text });
  await newTestimonials.save();
  res.json({ message: 'OK' });
} catch (err) {
  res.status(500).json({ message: err });
}
});


router.route('/testimonials/:id').put(async(req, res) => {
  const { author, text } = req.body;

try {
  const dep = await Testimonials.findById(req.params.id);
  if(dep) {
    await Testimonials.updateOne({ _id: req.params.id }, { $set: { author:author, text:text }});
    res.json({ message: 'OK' });
  }
  else res.status(404).json({ message: 'Not found...' });
}
catch(err) {
  res.status(500).json({ message: err });
}
});


router.route('/testimonials/:id').delete(async(req, res) => {
  try {
    const dep = await Testimonials.findById(req.params.id);
    if(dep) {
      await Testimonials.deleteOne({ _id: req.params.id });
      res.json(await Testimonials.find());
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }});

module.exports = router;