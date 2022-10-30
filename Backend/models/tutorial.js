'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Tutorial extends Model {
  };
  Tutorial.init({
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    video_url: DataTypes.STRING,
  }, {
    sequelize,
    underscored: true,
    tableName: 'Tutorials',
    modelName: 'Tutorial'
  })
  Tutorial.inputSchema = {
    name: 'required'
  }
  return Tutorial
}
