const { DataTypes } = require('sequelize');
const sequelize = require('../models/dbconnection');  

const PreProvision = sequelize.define('PreProvision', {
  deviceId: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  preDate: {
    type: DataTypes.DATE
  },
  versionUpdated: {
    type: DataTypes.STRING(255)
  },
  lastModifiedDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'pre_provision',
  timestamps: false
});

module.exports = PreProvision;
