const testcontrol = require('../models/location_master');

// GET all activity streams
module.exports = async (req, res) => {
  try {
    console.log('testing')
    const activityStreams = await testcontrol.findAll();
    console.log('test 2')
    res.json(activityStreams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};