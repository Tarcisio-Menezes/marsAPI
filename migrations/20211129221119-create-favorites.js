'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Favorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      imagePath: {
        allowNull: false,
        type: Sequelize.STRING,
        field: "image_path"
      },
      rover: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      camera: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      landing: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      launch: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'published',
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'updated',
      }
    })
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('Favorites');
  },
};
