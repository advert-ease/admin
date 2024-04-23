const { DataTypes } = require('sequelize');
const sequelize = require('../models/dbconnection');  

const VendorDetails = sequelize.define('VendorDetails', {
  vendor_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: true
  },
  Vendor_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  Contact_no: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  email_id: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  vendor_address: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  City: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  State: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  Gst_no: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  Creation_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true
  },
  last_modified_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
    allowNull: true
  }
}, {
  tableName: 'vendor_details', 
  timestamps: false 
});

module.exports = VendorDetails;
