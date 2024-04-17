const express = require('express');
const router = express.Router();
const PreProvisionController = require('../controllers/preprovision.controller');


router.post('/pre_provision_create', PreProvisionController.createPreProvision);
router.put('/pre_provision_update/:id', PreProvisionController.updatePreProvision);
router.get('/pre_provisions', PreProvisionController.getAllPreProvisions);
router.get('/pre_provision/:id', PreProvisionController.getPreProvisionById);

module.exports = router;


