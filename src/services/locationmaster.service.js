// services/locationService.js
const Location = require('../models/location_master');
/*
exports.createLocation = async (name) => {
  try {
    const location = await Location.create({ name }, { tableName: 'location_master' });
    return location;
  } catch (error) {
    throw new Error(error.message);
  }
};
*/

exports.updateLocation = async (id, name) => {
  try {
    const [updatedRowsCount] = await Location.update({ name }, { where: { id } });
    return updatedRowsCount;
  } catch (error) {
    throw new Error(error.message);
  }
};


exports.createLocation = async (locationData) => {
    try {
      const location = await Location.create(locationData);
      return location;
    } catch (error) {
      throw new Error(error.message);
    }
  };