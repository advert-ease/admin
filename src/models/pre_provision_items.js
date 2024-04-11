const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); 
const PreProvisionItems = sequelize.define('PreProvisionItems', {
    Sl_no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    item_sl_no: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: ItemMaster,
        key: 'SL_NO'
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
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'Pre_provision_items', 
    timestamps: false 
  });
  
 
  module.exports = PreProvisionItems;