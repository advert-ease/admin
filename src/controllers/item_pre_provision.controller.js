// controllers/item_preprovision_controller.js
const itemPreprovisionService = require('../services/item_pre_provision.service');

exports.getAllItems = async (req, res) => {
  try {
    const items = await itemPreprovisionService.getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
