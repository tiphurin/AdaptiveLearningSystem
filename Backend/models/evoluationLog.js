'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class EvoluationLog extends Model {
    static associate (models) {
      this.belongsTo(models.EvoluationTool, {
        foreignKey: 'evoluation_id'
      })
      this.belongsTo(models.EvoluationQuestion, {
        foreignKey: 'evoluation_question_id'
      })
      this.belongsTo(models.EvoluationChoice, {
        foreignKey: 'evoluation_choice_id'
      })
      this.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
    }
  }
  EvoluationLog.init({
    evoluation_id: DataTypes.INTEGER,
    evoluation_question_id: DataTypes.INTEGER,
    evoluation_choice_id: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    underscored: true,
    tableName: 'EvoluationLogs',
    modelName: 'EvoluationLog'
  })
  EvoluationLog.inputSchema = {
    name: 'required'
  }
  return EvoluationLog
}
