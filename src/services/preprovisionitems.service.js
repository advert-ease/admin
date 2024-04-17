const PreProvisionItems = require('../models/pre_provision_items');

exports.createPreProvisionItem = async (itemData) => {
  try {
      const item = await PreProvisionItems.create(itemData);
      return item;
  } catch (error) {
      throw new Error(error.message);
  }
};

exports.updatePreProvisionItem = async (slNo, updatedItemData) => {
  try {
      const [updatedRowsCount] = await PreProvisionItems.update(updatedItemData, {
          where: { Sl_no: slNo },
      });
      if (updatedRowsCount === 0) {
          throw new Error('PreProvision item not found or no changes applied.');
      }
      const updatedItem = await PreProvisionItems.findByPk(slNo);
      return updatedItem;
  } catch (error) {
      throw new Error(error.message);
  }
};

exports.getAllPreProvisionItems = async () => {
  try {
      const allItems = await PreProvisionItems.findAll();
      return allItems;
  } catch (error) {
      throw new Error(error.message);
  }
};

exports.getPreProvisionItemById = async (slNo) => {
  try {
      const item = await PreProvisionItems.findByPk(slNo);
      return item;
  } catch (error) {
      throw new Error(error.message);
  }
};
