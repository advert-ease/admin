const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemmaster.controller');

router.post('/item_master/create', itemController.createItem);

// Route for updating an existing item
router.put('/item_master/update/:id', itemController.updateItem);


router.get('/item_master', itemController.getAllItems);

// Route for retrieving a specific item by ID
router.get('/item_master/:id', itemController.getItemById);

module.exports = router;