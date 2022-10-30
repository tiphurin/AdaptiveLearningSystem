'use strict'
const dayjs = require('dayjs')
const db = require('../models')
const setting = require('./generates/setting')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Setting', setting)
    await db.User.create({
      id: 1,
      firstname: 'Admin',
      lastname: 'Admin',
      username: 'admin',
      email: process.env.ADMIN_DEV_EMAIL,
      password: process.env.ADMIN_DEV_PASSWORD,
      role: 'admin'
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Setting', null)
    await queryInterface.bulkDelete('Users', null)
  }
}
