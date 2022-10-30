'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn('Users', 'is_teacher_estimate',
          {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          }, { transaction: t }),
        queryInterface.addColumn('Users', 'is_parent_estimate', {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        }, { transaction: t })
      ]);
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn('Users', 'is_teacher_estimate', { transaction: t }),
        queryInterface.removeColumn('Users', 'is_parent_estimate', { transaction: t }),
      ]);
    });
  }
};
