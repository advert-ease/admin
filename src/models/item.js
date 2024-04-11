
const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); 


const Item = sequelize.define('Item', {
  sl_no: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  status: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  current_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  stock: {
    type: DataTypes.BIGINT,
    allowNull: true
  },
  used_stock: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'item', // Specify the table name if it's different from the model name
  timestamps: false // Disable timestamps (createdAt and updatedAt)
});

// Export the model
module.exports = Item;
