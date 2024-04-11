const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../models/dbconnection'); 
const LocationMaster = sequelize.define('LocationMaster', {
    Location_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Location_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Contact_no: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    Location_address: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Pincode: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    Loc_gst_no: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    Location_type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    Creation_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    Last_modified_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW
    },
    location_email_id: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'location_master', 
    timestamps: false 
  });
  
 
  module.exports = LocationMaster;