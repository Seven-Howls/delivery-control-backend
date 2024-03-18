'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const types = Sequelize.DataTypes
        await queryInterface.createTable('permissoes', {
            id: {
                primaryKey: true,
                type: types.STRING,
                allowNull: false
            },
            nome: {
                allowNull: false,
                type: types.STRING
            },
            nivel: {
                allowNull: false,
                unique: true,
                type: types.INTEGER
            },
            created_at: {
                allowNull: false,
                type: types.DATE
            },
            updated_at: {
                allowNull: false,
                type: types.DATE
            },
            deleted_at: {
                allowNull: true,
                type: types.DATE
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("permissoes");
    }
};
