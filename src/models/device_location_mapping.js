const { DataTypes } = require('sequelize');
const sequelize = require('../models/dbconnection');  

const DeviceLocationMapping = sequelize.define('DeviceLocationMapping', {
  slNo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  deviceId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  installationDate: {
    type: DataTypes.DATE
  },
  lastModifiedDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'device_location_mapping',
  timestamps: false
});

module.exports = DeviceLocationMapping;
