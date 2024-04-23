
const { DataTypes } = require('sequelize');
const sequelize = require('../models/dbconnection');  

const VendorDetails = sequelize.define('VendorDetails', {
  vendor_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Vendor_name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  Contact_no: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  email_id: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  vendor_address: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  City: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  State: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Gst_no: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  Creation_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  last_modified_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  }
}, {
  tableName: 'vendor_details', 
  timestamps: false 
});


module.exports = VendorDetails;
