const { DataTypes } = require('sequelize');
const sequelize = require('../models/dbconnection'); 
const LocationMaster = require('./location_master');
const PreProvision =require('./pre_provision_items') ;
const DeviceLocationMapping = sequelize.define('DeviceLocationMapping', {
    Sl_no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Location_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: LocationMaster,
        key: 'Location_id'
      }
    },
    device_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: PreProvision,
        key: 'device_id'
      }
    },
    Installation_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Last_modified_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW
    }
  }, {
    tableName: 'device_location_mapping', 
    timestamps: false 
  });
  
 
  module.exports = DeviceLocationMapping;