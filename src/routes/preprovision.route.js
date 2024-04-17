const express = require('express');
const router = express.Router();
const preprovisionController = require('../controllers/preprovision.controller');

router.post('/device_loaction_mapping', preprovisionController .createpreprovision);

module.exports = router;