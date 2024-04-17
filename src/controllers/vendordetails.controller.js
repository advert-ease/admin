const vendorService = require('../services/vendordetails.service');
exports.createVendor = async (req, res) => {
  try {
      const vendorData = req.body;
      const vendor = await vendorService.createVendor(vendorData);
      res.status(201).json(vendor);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.updateVendor = async (req, res) => {
  try {
      const vendorId = req.params.id;
      const updatedVendorData = req.body;
      const updatedVendor = await vendorService.updateVendor(vendorId, updatedVendorData);
      res.status(200).json(updatedVendor);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.getAllVendors = async (req, res) => {
  try {
      const allVendors = await vendorService.getAllVendors();
      res.status(200).json(allVendors);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.getVendorById = async (req, res) => {
  try {
      const vendorId = req.params.id;
      const vendor = await vendorService.getVendorById(vendorId);
      if (!vendor) {
          res.status(404).json({ message: 'Vendor not found' });
          return;
      }
      res.status(200).json(vendor);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
