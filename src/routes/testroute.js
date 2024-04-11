const express = require('express');
const router = express.Router();
const testmodel = require('../controllers/locationmaster.controller');
const locationController = require('../controllers/locationmaster.controller');

//router.get('/loaction_master',testmodel);
router.post('/api/location_master', locationController.createLocation);


module.exports=router;
