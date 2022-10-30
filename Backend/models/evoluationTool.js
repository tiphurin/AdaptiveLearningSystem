'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class EvoluationTool extends Model {
    static associate (models) {
      this.hasMany(models.EvoluationQuestion, {
        foreignKey: 'evoluation_tool_id'
      })
      this.hasMany(models.EvoluationLog, {
        foreignKey: 'evoluation_id'
      })
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
    }
  }
  EvoluationTool.init({
    name: DataTypes.TEXT,
    description: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    is_delete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {
    sequelize,
    underscored: true,
    tableName: 'EvoluationTools',
    modelName: 'EvoluationTool'
  })
  EvoluationTool.inputSchema = {
    name: 'required'
  }
  return EvoluationTool
}
