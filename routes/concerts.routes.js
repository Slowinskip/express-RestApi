const express = require('express');
const router = express.Router();

const ConcertController = require('../controllers/concerts.controller');

router.route('/concerts').get(ConcertController.getAll);

router.route('/concerts/random').get(ConcertController.getRandom);

router.route('/seats/:id').get(ConcertController.getById);
  
router.route('/concerts').post(ConcertController.post);

router.route('/concerts/:id').put(ConcertController.edit);

router.route('/concerts/:id').delete(ConcertController.delete);

module.exports = router;