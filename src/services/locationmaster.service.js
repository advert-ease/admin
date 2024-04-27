// services/locationService.js

const LocationMaster = require('../models/location_master');




exports.createLocationmaster = async (locationData) => {
  try {
      const loc = await LocationMaster.create(locationData);
      return loc;
  } catch (error) {
      throw new Error(error.message);
  }
};




exports.updateLocation = async (LocationId, updatedLocationData) => {
  try {
    const [updatedRowsCount] = await LocationMaster.update(updatedLocationData, {
      where: { locationId: LocationId },
    });
    if (updatedRowsCount === 0) {
      throw new Error('Location not found or no changes applied.');
    }
    const updatedLocation = await LocationMaster.findByPk(LocationId);
    return updatedLocation;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getLocation = async () => {
  try {
      const alllocation = await LocationMaster.findAll();
      return alllocation;
  } catch (error) {
      throw new Error(error.message);
  }
};

exports.getlocationById = async (vendorId) => {
  try {
      const location = await LocationMaster.findByPk(vendorId);
      return location;
  } catch (error) {
      throw new Error(error.message);
  }
};

/*
exports.createLocation = async (name) => {
  try {
    const location = await Location.create({ name }, { tableName: 'location_master' });
    return location;
  } catch (error) {
    throw new Error(error.message);
  }
};


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
  */