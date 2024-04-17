const { DataTypes } = require('sequelize');
const sequelize = require('../models/dbconnection'); 
const DiscordItems = sequelize.define('DiscordItems', {
    SLNO: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    DISCORD_DATE: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    DISCORD_REASON: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    QUANTITY: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    DEVICE_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: PreProvision,
        key: 'device_id'
      }
    }
  }, {
    tableName: 'discord_items', 
    timestamps: false 
  });
  

  module.exports = DiscordItems;