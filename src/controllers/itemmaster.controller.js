
const VendorDetails = require('../models/vendor_details');
const ItemMaster = require('../models/item_master');
const itemService = require('../services/itemmaster.services');



exports.createItem = async (req, res) => {
  try {
    const itemData = req.body;
    console.log('Received payload:', itemData);

    // Check if all required fields are provided
    const requiredFields = ['itemCode', 'itemName', 'skuNo', 'unit', 'quantity', 'purchaseRateItem', 'totalPurchaseRate', 'vendorId', 'purchaseDate', 'description', 'currentStock'];
    if (!requiredFields.every(field => itemData[field])) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    const newItem = await itemService.createItem(itemData);
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedItemData = req.body;
    const updatedItem = await itemService.updateItem(itemId, updatedItemData);
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllItems = async (req, res) => {
  try {
    const allItems = await itemService.getAllItems();
    res.status(200).json(allItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getItemById = async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await itemService.getItemById(itemId);
    if (!item) {
      res.status(404).json({ message: 'Item not found' });
      return;
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



