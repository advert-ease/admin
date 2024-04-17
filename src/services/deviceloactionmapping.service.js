const DeviceLocationMapping = require('../models/device_location_mapping');

// Service function for inserting a new device location mapping
exports.insertDeviceLocationMapping = async (data) => {
  try {
    return await DeviceLocationMapping.create(data);
  } catch (error) {
    throw new Error('Error while inserting device location mapping');
  }
};

// Service function for updating an existing device location mapping
exports.updateDeviceLocationMapping = async (id, data) => {
  try {
    const [rowsUpdated] = await DeviceLocationMapping.update(data, {
      where: { Sl_no: id }
    });
    if (rowsUpdated === 0) {
      throw new Error('Device location mapping not found');
    }
    return rowsUpdated;
  } catch (error) {
    throw new Error('Error while updating device location mapping');
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
