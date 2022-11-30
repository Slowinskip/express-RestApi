const express = require('express');
const router = express.Router();

const testimonialsController = require('../controllers/testimonials.controller');


router.route('/testimonials').get(testimonialsController.getAll);

router.route('/testimonials/:id').get(testimonialsController.getById);

router.route('/testimonials/random').get(testimonialsController.getRandom);

router.route('/testimonials').post(testimonialsController.post);


router.route('/testimonials/:id').put(testimonialsController.edit);


router.route('/testimonials/:id').delete(testimonialsController.delete);

module.exports = router;