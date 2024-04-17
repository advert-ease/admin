const express = require('express');
const router = express.Router();
const DeviceLocationMappingController = require('../controllers/devicelocationmapping.controller');


router.post('/devicelocation_create', DeviceLocationMappingController.createDeviceLocationMapping);
router.put('/devicelocation/:id', DeviceLocationMappingController.updateDeviceLocationMapping);
router.get('/devicelocation', DeviceLocationMappingController.getAllDeviceLocationMappings);
router.get('/devicelocation/:id', DeviceLocationMappingController.getDeviceLocationMappingById);


module.exports = router;
