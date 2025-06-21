'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tarjetas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numero: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      fecha_vencimiento: {
        type: Sequelize.STRING,
        allowNull: false
      },
      CVC: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      cantidad_de_dinero: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tarjetas');
  }
};
