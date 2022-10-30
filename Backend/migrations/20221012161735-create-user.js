'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING(255)
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      salt: {
        type: Sequelize.STRING
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      refresh_token: {
        type: Sequelize.STRING
      },
      refresh_token_expire_at: {
        type: Sequelize.DATE
      },
      address: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      password_reset_token: {
        type: Sequelize.STRING
      },
      password_reset_expire_at: {
        type: Sequelize.DATE
      },
      role: {
        type: Sequelize.ENUM('admin', 'teacher', 'parent','student'),
        defaultValue: 'teacher'
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      create_by: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DATE
      }
    }).then(() => queryInterface.addIndex('Users', [
      'username'
    ]))
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users')
  }
}
