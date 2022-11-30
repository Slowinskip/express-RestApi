const express = require('express');
const router = express.Router();

const SeatsController = require('../controllers/seats.controller');


router.route('/seats').get(SeatsController.getAll);

router.route('/seats/:id').get(SeatsController.getById);

router.route('/seats/random').get(async(req, res) => {
});

router.route('/seats').post(SeatsController.post);

router.route('/seats/:id').put(SeatsController.edit);

router.route('/seats/:id').delete(SeatsController.delete);

module.exports = router;