'use strict'
const crypto = require('crypto')
const {
  Model
} = require('sequelize')
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      this.hasMany(models.AccessToken, {
        foreignKey: 'user_id'
      })
      this.hasMany(models.UserParent, {
        foreignKey: 'student_id'
      })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: DataTypes.STRING,
    salt: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
    refresh_token_expire_at: DataTypes.DATE,
    address: DataTypes.STRING,
    tel: DataTypes.STRING,
    password_reset_token: DataTypes.STRING,
    password_reset_expire_at: DataTypes.DATE,
    role: {
      type: DataTypes.ENUM('admin', 'teacher', 'parent','student'),
      defaultValue: 'teacher'
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    create_by: DataTypes.INTEGER,
    is_teacher_estimate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_parent_estimate: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        const salt = bcrypt.genSaltSync(10)
        user.salt = salt
        user.password = bcrypt.hashSync(user.password, salt)
        // user.verify_token = crypto.randomBytes(16).toString('hex')
      }
    },
    sequelize,
    underscored: true,
    tableName: 'Users',
    modelName: 'User'
  })
  User.inputSchema = {
    username: 'required'
  }
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password)
  }
  User.prototype.validAuthToken = function (authToken) {
    return this.auth_token === authToken
  }
  return User
}
