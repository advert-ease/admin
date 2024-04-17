const PreProvisionService = require('../services/preprovision.service');


exports.createPreProvision = async (req, res, next) => {
  try {
      const preProvision = await PreProvisionService.createPreProvision(req.body);
      res.status(201).json(preProvision);
  } catch (error) {
      next(error);
  }
};

exports.updatePreProvision = async (req, res, next) => {
  const deviceId = req.params.id;
  try {
      const updatedPreProvision = await PreProvisionService.updatePreProvision(deviceId, req.body);
      res.status(200).json(updatedPreProvision);
  } catch (error) {
      next(error);
  }
};

exports.getAllPreProvisions = async (req, res, next) => {
  try {
      const allPreProvisions = await PreProvisionService.getAllPreProvisions();
      res.status(200).json(allPreProvisions);
  } catch (error) {
      next(error);
  }
};

exports.getPreProvisionById = async (req, res, next) => {
  const deviceId = req.params.id;
  try {
      const preProvision = await PreProvisionService.getPreProvisionById(deviceId);
      res.status(200).json(preProvision);
  } catch (error) {
      next(error);
  }
};

