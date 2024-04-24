const PreProvision = require('../models/pre_provision');



exports.createPreProvision = async (preProvisionData) => {
  try {
      const preProvision = await PreProvision.create(preProvisionData);
      return preProvision;
  } catch (error) {
      throw new Error(error.message);
  }
};

exports.updatePreProvision = async (deviceId, updatedPreProvisionData) => {
  try {
      const [updatedRowsCount] = await PreProvision.update(updatedPreProvisionData, {
          where: { deviceId: deviceId },
      });
      if (updatedRowsCount === 0) {
          throw new Error('PreProvision data not found or no changes applied.');
      }
      const updatedPreProvision = await PreProvision.findByPk(deviceId);
      return updatedPreProvision;
  } catch (error) {
      throw new Error(error.message);
  }
};

exports.getAllPreProvisions = async () => {
  try {
      const allPreProvisions = await PreProvision.findAll();
      return allPreProvisions;
  } catch (error) {
      throw new Error(error.message);
  }
};

exports.getPreProvisionById = async (deviceId) => {
  try {
      const preProvision = await PreProvision.findByPk(deviceId);
      return preProvision;
  } catch (error) {
      throw new Error(error.message);
  }
};
