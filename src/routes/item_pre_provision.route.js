// routes/item_preprovision_routes.js
const express = require('express');
const router = express.Router();
const itemPreprovisionController = require('../controllers/item_pre_provision.controller');

router.get('/itemspreprovision', itemPreprovisionController.getAllItems);

module.exports = router;
