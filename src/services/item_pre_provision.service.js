// services/item_preprovision_service.js
const ItemPreprovisionView = require('../models/item_pre_provision_view.model');

exports.getAllItems = async () => {
  try {
    const items = await ItemPreprovisionView.findAll();
    return items;
  } catch (error) {
    throw new Error(error.message);
  }
};
