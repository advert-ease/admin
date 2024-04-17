const DeviceLocationMapping = require('../models/device_location_mapping');

// Service function for inserting a new device location mapping
exports.insertDeviceloaction = async (itemData) => {
  try {
    const newlocation= await DeviceLocationMapping.create(itemData);
    return newlocation;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Service function for updating an existing device location mapping
exports.updateloactionmapping = async (itemId, updatedItemData) => {
  try {
    const [updatedRowsCount] = await DeviceLocationMapping.update(updatedItemData, {
      where: { SL_NO: itemId }, // Target item by its ID
    });

    // Check if any rows were updated
    if (updatedRowsCount === 0) {
      // If no rows were updated, throw an error indicating the item was not found or no changes were applied
      throw new Error('Item not found or no changes applied.');
    }

    // If rows were updated, fetch and return the updated item
    const updatedItem = await DeviceLocationMapping.findByPk(itemId);
    return updatedItem;
  } catch (error) {
    // If an error occurs during the update operation, re-throw the error with a descriptive message
    throw new Error(error.message);
  }
};

// Service function for getting all device location mappings
exports.getAllDeviceLocationMappings = async () => {
  try {
    return await DeviceLocationMapping.findAll();
  } catch (error) {
    throw new Error('Error while fetching device location mappings');
  }
};
