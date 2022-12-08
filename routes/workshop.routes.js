const express = require('express');
const router = express.Router();

const workshopController = require('../controllers/workshop.controller');

router.route('/workshops').get(workshopController.getAll);

module.exports = router;
