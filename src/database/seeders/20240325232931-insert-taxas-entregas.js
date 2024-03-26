'use strict';
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Consultar todas as empresas da base de dados
        const empresas = await queryInterface.sequelize.query('SELECT id FROM empresas', { type: queryInterface.sequelize.QueryTypes.SELECT });

        // Array para armazenar todas as inserções de seeds
        const seeds = [];

        // Iterar sobre cada empresa
        empresas.forEach(empresa => {
            seeds.push(
                {
                    id: uuidv4(),
                    empresa_id: empresa.id,
                    descricao: 'Taxa de entrega padrão',
                    valor: 5,
                    created_at: new Date(),
                    updated_at: new Date(),
                    deleted_at: null
                },
                {
                    id: uuidv4(),
                    empresa_id: empresa.id,
                    descricao: 'Taxa de entrega expressa',
                    valor: 10,
                    created_at: new Date(),
                    updated_at: new Date(),
                    deleted_at: null
                },
                {
                    id: uuidv4(),
                    empresa_id: empresa.id,
                    descricao: 'Taxa de entrega',
                    valor: 11,
                    created_at: new Date(),
                    updated_at: new Date(),
                    deleted_at: new Date()
                }
            );
        });

        // Inserir todas as seeds
        await queryInterface.bulkInsert('taxas_entregas', seeds, {});
    },

    down: async (queryInterface, Sequelize) => {
        // Remover todas as seeds
        await queryInterface.bulkDelete('taxas_entregas', null, {});
    }
};
