const { DataTypes } = require('sequelize');
const sequelize = require('../models/dbconnection');  

const PreProvisionItems = sequelize.define('PreProvisionItems', {
  slNo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  itemCode: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  deviceId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'pre_provision_items',
  timestamps: false
});

module.exports = PreProvisionItems;
