const preprovision = require('../models/pre_provision');

exports.createpreprovision  = async (preprovisionData) => {
    try {
      const preprovisonMapping  = await preprovision.create(preprovisionData);
      return preprovisonMapping;
    } catch (error) {
      throw new Error(error.message);
    }
  };