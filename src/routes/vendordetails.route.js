const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendordetails.controller');

router.post('/vendor_details/create', vendorController.createVendor);


router.put('/vendor_details/:id', vendorController.updateVendor); // Update route
router.get('/vendor_details', vendorController.getAllVendors); // Get all vendors route
router.get('/vendor_details/:id', vendorController.getVendorById); // Get vendor by ID route



module.exports = router;