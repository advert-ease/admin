const { DataTypes } = require('sequelize');
const sequelize = require('../models/dbconnection'); 
const VendorDetails =require('./vendor_details');
const ItemMaster = sequelize.define('ItemMaster', {
    SL_NO: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    item_code: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Item_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    Sku_no: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Unit: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Purchase_rate_item: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    Total_purchase_rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: VendorDetails,
        key: 'vendor_id'
      }
    },
    Purchase_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false
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
    current_stock: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'item_master', 
    timestamps: false
  });

  module.exports = ItemMaster;