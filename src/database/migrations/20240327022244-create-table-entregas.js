'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const types = Sequelize.DataTypes
        await queryInterface.createTable('entregas',{
            id: {
                primaryKey: true,
                type: types.STRING,
                allowNull: false
            },
            taxa_entrega_id: {
                allowNull: false,
                type: types.STRING,
                references:{
                    model: 'taxas_entregas',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            motoboy_id: {
                allowNull: false,
                type: types.STRING,
                references:{
                    model: 'motoboys',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            metodo_pagamento_id: {
                allowNull: false,
                type: types.STRING,
                references:{
                    model: 'metodos_pagamentos',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            status_id: {
                allowNull: false,
                type: types.STRING,
                references:{
                    model: 'status',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            valor_produto: {
                type: types.BIGINT,
                allowNull: false
            },
            taxa_servico: {
                type: types.BIGINT,
                allowNull: false
            },
            valor_liquido: {
                type: types.BIGINT,
                allowNull: false
            },
            comanda_id: {
                type: types.BIGINT,
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
        await queryInterface.dropTable('entregas')
    } 
};
