const vendorService = require('../controllers/vendordetails.controller');
exports.createVendor = async (req, res) => {
    try {
      const vendorData = req.body;
      const vendor = await vendorService.createVendor(vendorData);
      res.status(201).json(vendor);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
