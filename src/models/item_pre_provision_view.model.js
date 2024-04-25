// models/item_preprovision_view.js
const { DataTypes } = require('sequelize');
const sequelize = require('../models/dbconnection');

const ItemPreprovisionView = sequelize.define('ItemPreprovisionView', {
  item_slNo: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  item_itemCode: DataTypes.STRING,
  item_itemName: DataTypes.STRING,
  preprovision_deviceId: DataTypes.INTEGER,
  preprovision_quantity: DataTypes.INTEGER
}, {
  tableName: 'item_preprovision_view',
  timestamps: false
});

module.exports = ItemPreprovisionView;
