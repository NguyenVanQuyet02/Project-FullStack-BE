'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'quyet2k2ocsa@gmail.com',
      password: 'root@1234',
      firstName: 'Celine',
      lastName: 'Maris',
      address: 'Ha Noi',
      phoneNumber: '0979103083',
      gender: 1,
      image: '',
      roleId: 'ROLE',
      positionId: 'Thac Si',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
