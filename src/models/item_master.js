const { DataTypes } = require('sequelize');
const sequelize = require('../models/dbconnection'); 
const VendorDetails = require('./vendor_details');

const ItemMaster = sequelize.define('ItemMaster', {
  slNo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  itemCode: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  itemName: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  skuNo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  purchaseRateItem: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  totalPurchaseRate: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  vendorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  purchaseDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
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
  },
  currentStock: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'item_master',
  timestamps: false
});

module.exports = ItemMaster;

