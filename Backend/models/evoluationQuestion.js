'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class EvoluationQuestion extends Model {
    static associate (models) {
      this.belongsTo(models.EvoluationTool, {
        foreignKey: 'evoluation_tool_id'
      })
      this.hasMany(models.EvoluationLog, {
        foreignKey: 'evoluation_question_id'
      })
      this.hasMany(models.EvoluationChoice, {
        foreignKey: 'evoluation_question_id'
      })
    }
  }
  EvoluationQuestion.init({
    question: DataTypes.STRING,
    evoluation_tool_id: DataTypes.INTEGER,
  }, {
    sequelize,
    underscored: true,
    tableName: 'EvoluationQuestions',
    modelName: 'EvoluationQuestion'
  })
  EvoluationQuestion.inputSchema = {
    question: 'required'
  }
  return EvoluationQuestion
}
