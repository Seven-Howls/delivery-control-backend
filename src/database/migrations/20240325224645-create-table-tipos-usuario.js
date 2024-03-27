'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const types = Sequelize.DataTypes
        await queryInterface.createTable('tipos_usuarios',{
            id: {
                primaryKey: true,
                type: types.STRING,
                allowNull: false
            },
            empresa_id: {
                allowNull: false,
                type: types.STRING,
                references:{
                    model: 'empresas',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            nome:{
                allowNull: false,
                type: types.STRING
            },
            nivel:{
                type: types.INTEGER,
                allowNull: false
                
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
        await queryInterface.dropTable('tipos_usuarios')
    } 
};
