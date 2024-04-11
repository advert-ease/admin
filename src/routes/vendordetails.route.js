const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendordetails.controller');

router.post('/location_master', vendorController.createVendor);

module.exports = router;