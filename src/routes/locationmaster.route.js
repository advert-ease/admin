const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationmaster.controller');

router.post('/location_master', locationController.createLocation);

module.exports = router;
