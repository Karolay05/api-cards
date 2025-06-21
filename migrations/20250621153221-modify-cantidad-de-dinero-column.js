'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('tarjetas', 'cantidad_de_dinero', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('tarjetas', 'cantidad_de_dinero', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
  }
};
