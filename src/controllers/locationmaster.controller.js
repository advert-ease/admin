// controllers/locationController.js
const locationService = require('../services/locationmaster.service');
/*
exports.createLocation = async (req, res) => {
  try {
    const { name } = req.body;
    const location = await locationService.createLocation(name);
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
*/



exports.createLocation = async (req, res) => {
  try {
    const locationData = req.body;
    const location = await locationService.createLocation(locationData);
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedRowsCount = await locationService.updateLocation(id, name);
    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: 'Location not found' });
    }
    res.status(200).json({ message: 'Location updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// controllers/locationController.js

const Location = require('../models/location_master');

exports.getLocations = async (req, res) => {
  try {
    // Retrieve locations from the database
    const locations = await Location.find(); // Assuming you're using Mongoose for MongoDB

    // Send response with locations
    res.status(200).json(locations);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
};

