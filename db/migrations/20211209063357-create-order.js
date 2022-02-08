'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      model: {
        type: Sequelize.TEXT
      },
      size: {
        type: Sequelize.TEXT
      },
      tel: {
        type: Sequelize.TEXT
      },
      adress: {
        type: Sequelize.TEXT
      },
      date: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.TEXT
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users'
        }
      },
      status: {
        type: Sequelize.TEXT
      }  
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};
