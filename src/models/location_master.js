const { DataTypes } = require('sequelize');
const sequelize = require('../models/dbconnection');  

const LocationMaster = sequelize.define('LocationMaster', {
  locationId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  locationName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  contactNo: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  locationAddress: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  pincode: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  locGstNo: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  locationType: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true
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
  },
  locationEmailId: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'location_master',
  timestamps: false
});

module.exports = LocationMaster;
