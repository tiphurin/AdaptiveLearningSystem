'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class EvoluationChoice extends Model {
    static associate (models) {
      this.belongsTo(models.EvoluationQuestion, {
        foreignKey: 'evoluation_question_id'
      })
      this.hasMany(models.EvoluationLog, {
        foreignKey: 'evoluation_choice_id'
      })
    }
  }
  EvoluationChoice.init({
    choice: DataTypes.STRING,
    evoluation_question_id: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
  }, {
    sequelize,
    underscored: true,
    tableName: 'EvoluationChoices',
    modelName: 'EvoluationChoice'
  })
  EvoluationChoice.inputSchema = {
    choice: 'required'
  }
  return EvoluationChoice
}
