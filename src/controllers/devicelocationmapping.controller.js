const deviceLocationMappingService = require('../services/deviceloactionmapping.service');


// Controller for inserting a new device location mapping
exports.insertDeviceLocationMapping = async (req, res) => {
  try {
    const data = req.body;
    const newDeviceLocationMapping = await deviceLocationMappingService.insertDeviceloaction(data);
    res.status(201).json(newDeviceLocationMapping);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller for updating an existing device location mapping
exports.updateloaction = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updatedItemData = req.body;
    const updatedItem = await deviceLocationMappingService.updateloactionmapping(itemId, updatedItemData);
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
