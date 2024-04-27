const express = require('express');
const router = express.Router();
const locationMasterService = require('../controllers/locationmaster.controller');




router.post('/location/create', locationMasterService.createLocation);

router.put('/location_details/:id', locationMasterService.updateLocation);

router.get('/location_details', locationMasterService.getLocation); // Get all vendors route
router.get('/location/:id', locationMasterService.getlocationById); // Get vendor by ID route

module.exports = router;

/*
router.post('/location_master', locationController.createLocation);

module.exports = router;
*/