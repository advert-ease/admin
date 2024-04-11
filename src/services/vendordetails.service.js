const Vendor = require('../models/vendor_details');
exports.createVendor = async (locationData) => {
    try {
      const location = await Vendor.create(vendorData);
      return location;
    } catch (error) {
      throw new Error(error.message);
    }
  };