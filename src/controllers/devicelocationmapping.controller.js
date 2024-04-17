const deviceLocationMappingService = require('../services/deviceloactionmapping.service');
const { validationResult } = require('express-validator');

// Controller for inserting a new device location mapping
exports.insertDeviceLocationMapping = async (req, res) => {
  try {
    const data = req.body;
    const newDeviceLocationMapping = await deviceLocationMappingService.insertDeviceLocationMapping(data);
    res.status(201).json(newDeviceLocationMapping);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for updating an existing device location mapping
exports.updateDeviceLocationMapping = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const rowsUpdated = await deviceLocationMappingService.updateDeviceLocationMapping(id, data);
    res.status(200).json({ rowsUpdated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for getting all device location mappings
exports.getAllDeviceLocationMappings = async (req, res) => {
  try {
    const allDeviceLocationMappings = await deviceLocationMappingService.getAllDeviceLocationMappings();
    res.status(200).json(allDeviceLocationMappings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
