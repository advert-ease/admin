const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); 
const PreProvision = sequelize.define('PreProvision', {
    device_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Pre_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Version_updated: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Last_modified_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW
    }
  }, {
    tableName: 'pre_provision', 
    timestamps: false 
  });
  
 
  module.exports = PreProvision;