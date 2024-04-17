const express = require('express');
const router = express.Router();
const deviceLocationMappingController = require('../controllers/devicelocationmapping.controller');

// Routes for device location mapping APIs
router.post('/device-location-mapping', deviceLocationMappingController.insertDeviceLocationMapping);
router.put('/device-location-mapping/:id', deviceLocationMappingController.updateDeviceLocationMapping);
router.get('/device-location-mapping', deviceLocationMappingController.getAllDeviceLocationMappings);

module.exports = router;
