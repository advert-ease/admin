const item = require('../models/item_master');

exports.createItem = async (itemData) => {
  try {
    const newItem = await item.create(itemData);
    return newItem;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.updateItem = async (itemId, updatedItemData) => {
  try {
    // Update the item based on the provided item ID
    const [updatedRowsCount] = await item.update(updatedItemData, {
      where: { SL_NO: itemId }, // Target item by its ID
    });

    // Check if any rows were updated
    if (updatedRowsCount === 0) {
      // If no rows were updated, throw an error indicating the item was not found or no changes were applied
      throw new Error('Item not found or no changes applied.');
    }

    // If rows were updated, fetch and return the updated item
    const updatedItem = await item.findByPk(itemId);
    return updatedItem;
  } catch (error) {
    // If an error occurs during the update operation, re-throw the error with a descriptive message
    throw new Error(error.message);
  }
};




exports.getAllItems = async () => {
  try {
    const allItems = await item.findAll();
    return allItems;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getItemById = async (itemId) => {
  try {
    const item = await item.findByPk(itemId);
    return item;
  } catch (error) {
    throw new Error(error.message);
  }
};