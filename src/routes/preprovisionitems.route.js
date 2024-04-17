const express = require('express');
const router = express.Router();
const PreProvisionItemsController = require('../controllers/preprovisionitems.controller');

router.post('/pre_provision_item_create', PreProvisionItemsController.createPreProvisionItem);
router.put('/pre_provision_item_update/:slNo', PreProvisionItemsController.updatePreProvisionItem);
router.get('/pre_provision_items', PreProvisionItemsController.getAllPreProvisionItems);
router.get('/pre_provision_item/:slNo', PreProvisionItemsController.getPreProvisionItemById);

module.exports = router;
