const Vendor = require('../models/vendor_details');



exports.createVendor = async (vendorData) => {
  try {
      const vendor = await Vendor.create(vendorData);
      return vendor;
  } catch (error) {
      throw new Error(error.message);
  }
};

exports.updateVendor = async (vendorId, updatedVendorData) => {
  try {
      const [updatedRowsCount] = await Vendor.update(updatedVendorData, {
          where: { vendorId: vendorId },
      });
      if (updatedRowsCount === 0) {
          throw new Error('Vendor not found or no changes applied.');
      }
      const updatedVendor = await Vendor.findByPk(vendorId);
      return updatedVendor;
  } catch (error) {
      throw new Error(error.message);
  }
};

exports.getAllVendors = async () => {
  try {
      const allVendors = await Vendor.findAll();
      return allVendors;
  } catch (error) {
      throw new Error(error.message);
  }
};

exports.getVendorById = async (vendorId) => {
  try {
      const vendor = await Vendor.findByPk(vendorId);
      return vendor;
  } catch (error) {
      throw new Error(error.message);
  }
};