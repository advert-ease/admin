const { DataTypes } = require('sequelize');
const sequelize = require('../models/dbconnection');  

const VendorDetails = sequelize.define('VendorDetails', {
  vendorId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  vendorName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  contactNo: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  emailId: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  vendorAddress: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  gstNo: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  creationDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  lastModifiedDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'vendor_details',
  timestamps: false
});

module.exports = VendorDetails;

module.exports = VendorDetails
