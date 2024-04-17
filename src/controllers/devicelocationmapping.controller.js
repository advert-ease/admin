const DeviceLocationMappingService = require('../services/deviceloactionmapping.service');



exports.createDeviceLocationMapping = async (req, res, next) => {
  try {
      const mapping = await DeviceLocationMappingService.createDeviceLocationMapping(req.body);
      res.status(201).json(mapping);
  } catch (error) {
      next(error);
  }
};

exports.updateDeviceLocationMapping = async (req, res, next) => {
  const mappingId = req.params.id;
  try {
      const updatedMapping = await DeviceLocationMappingService.updateDeviceLocationMapping(mappingId, req.body);
      res.status(200).json(updatedMapping);
  } catch (error) {
      next(error);
  }
};

exports.getAllDeviceLocationMappings = async (req, res, next) => {
  try {
      const allMappings = await DeviceLocationMappingService.getAllDeviceLocationMappings();
      res.status(200).json(allMappings);
  } catch (error) {
      next(error);
  }
};

exports.getDeviceLocationMappingById = async (req, res, next) => {
  const mappingId = req.params.id;
  try {
      const mapping = await DeviceLocationMappingService.getDeviceLocationMappingById(mappingId);
      res.status(200).json(mapping);
  } catch (error) {
      next(error);
  }
};
