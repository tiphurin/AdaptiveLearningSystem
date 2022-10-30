'use strict'
const crypto = require('crypto')
const {
  Model
} = require('sequelize')
const dayjs = require('dayjs')

module.exports = (sequelize, DataTypes) => {
  class UserParent extends Model {
    static associate (models) {
      this.belongsTo(models.User, {
        foreignKey: 'parent_id'
      })
      this.belongsTo(models.User, {
        foreignKey: 'student_id'
      })
    }
  };
  UserParent.init({
    parent_id: DataTypes.INTEGER,
    student_id: DataTypes.INTEGER
  }, {
    sequelize,
    underscored: true,
    tableName: 'UserParents',
    modelName: 'UserParent'
  })
  return UserParent
}
