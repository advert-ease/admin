const { DataTypes } = require('sequelize');
const sequelize = require('../models/dbconnection'); 
const VendorDetails = require('./vendor_details');

const ItemMaster = sequelize.define('ItemMaster', {
    SL_NO: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true
    },
    item_code: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Item_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    Sku_no: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Unit: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Purchase_rate_item: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    Total_purchase_rate: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
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
      allowNull: true
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    Creation_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true
    },
    Last_modified_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
      allowNull: true
    },
    current_stock: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'item_master', 
    timestamps: false
  });

module.exports = ItemMaster;
