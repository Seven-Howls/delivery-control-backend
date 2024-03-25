'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const types = Sequelize.DataTypes
        await queryInterface.createTable('permissoes_tipos_usuarios', {
            id: {
                primaryKey: true,
                type: types.STRING,
                allowNull: false
            },
            permissao_id: {
                allowNull: false,
                type: types.STRING,
                references: {
                    model: 'permissoes',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            tipo_usuario_id: {
                allowNull: false,
                type: types.STRING,
                references: {
                    model: 'tipos_usuarios',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
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
        await queryInterface.dropTable('permissoes_tipos_usuarios')
    }
};
