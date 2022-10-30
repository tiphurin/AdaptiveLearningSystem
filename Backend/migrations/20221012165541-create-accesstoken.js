'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('AccessTokens', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      access_token: {
        type: Sequelize.STRING
      },
      ip: {
        type: Sequelize.STRING
      },
      expire_at: {
        type: Sequelize.DATE
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
    }).then(() => queryInterface.addIndex('AccessTokens', [
      'user_id'
    ])).then(() => queryInterface.addIndex('AccessTokens', [
      'access_token'
    ]))
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('AccessTokens')
  }
}
