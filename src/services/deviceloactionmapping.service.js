const DeviceLocationMapping = require('../models/device_location_mapping');


exports.createDeviceLocationMapping = async (mappingData) => {
  try {
      const mapping = await DeviceLocationMapping.create(mappingData);
      return mapping;
  } catch (error) {
      throw new Error(error.message);
  }
};

exports.updateDeviceLocationMapping = async (mappingId, updatedMappingData) => {
  try {
      const [updatedRowsCount] = await DeviceLocationMapping.update(updatedMappingData, {
          where: { Sl_no: mappingId },
      });
      if (updatedRowsCount === 0) {
          throw new Error('Device Location Mapping not found or no changes applied.');
      }
      const updatedMapping = await DeviceLocationMapping.findByPk(mappingId);
      return updatedMapping;
  } catch (error) {
      throw new Error(error.message);
  }
};

exports.getAllDeviceLocationMappings = async () => {
  try {
      const allMappings = await DeviceLocationMapping.findAll();
      return allMappings;
  } catch (error) {
      throw new Error(error.message);
  }
};

exports.getDeviceLocationMappingById = async (mappingId) => {
  try {
      const mapping = await DeviceLocationMapping.findByPk(mappingId);
      return mapping;
  } catch (error) {
      throw new Error(error.message);
  }
};
