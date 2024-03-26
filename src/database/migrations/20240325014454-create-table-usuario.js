'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const types = Sequelize.DataTypes
        await queryInterface.createTable('usuarios', {
            id: {
                primaryKey: true,
                type: types.STRING,
                allowNull: false
            },
            nome: {
                allowNull: false,
                type: types.STRING
            },
            cpf: {
                type: types.STRING(11),
                unique: true,
                allowNull: false
            },
            senha: {
                allowNull: false,
                type: types.STRING
            },
            celular: {
                allowNull: false,
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
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('usuarios');
    }
};
