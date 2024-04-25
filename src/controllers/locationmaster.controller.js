
const locationMasterService = require('../services/locationmaster.service');

exports.createLocation = async (req, res) => {
  try {
    const locationData = req.body;
    console.log('Received payload:', locationData); // Log the payload
    
    // Check if all other required fields are provided
    if (!locationData.locationName || !locationData.contactNo || !locationData.locationAddress || !locationData.pincode || !locationData.locGstNo || !locationData.locationType || !locationData.locationEmailId) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }
    
    const location = await locationMasterService.createLocationmaster(locationData);
    res.status(201).json(location);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.updateLocation = async (req, res) => {
  try {
      const LocationId = req.params.id;
      const updatedlocationData = req.body;
      const updatedlocation = await locationMasterService.updateLocation(LocationId, updatedlocationData);
      res.status(200).json(updatedlocation);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.getLocation = async (req, res) => {
  try {
    const location = await locationMasterService.getLocation(req.params.id);
    if (location) {
      res.status(200).json(location);
    } else {
      res.status(404).json({ message: 'Location not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getLocation = async (req, res) => {
  try {
      const alllocation = await locationMasterService.getLocation();
      res.status(200).json(alllocation);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.getlocationById = async (req, res) => {
  try {
      const locationId = req.params.id;
      const location = await vendorService.getlocationById(locationId);
      if (!location) {
          res.status(404).json({ message: 'location not found' });
          return;
      }
      res.status(200).json(location);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

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
*/

