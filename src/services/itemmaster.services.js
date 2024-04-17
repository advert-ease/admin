const item = require('../models/item_master');

exports.createitem = async (itemData) => {
    try {
      const itemsmaster = await item.create(itemData);
      return litemsmaster;
    } catch (error) {
      throw new Error(error.message);
    }
  };