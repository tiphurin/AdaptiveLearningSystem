'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Setting extends Model {
  };
  Setting.init({
    app_name: DataTypes.STRING,
    contact_address: DataTypes.TEXT,
    contact_tel: DataTypes.STRING,
    contact_email: DataTypes.STRING,
  }, {
    sequelize,
    underscored: true,
    tableName: 'Setting',
    modelName: 'Setting'
  })
  Setting.inputSchema = {
    app_name: 'required'
  }
  return Setting
}
