'use strict';

/** @type {import('sequelize-cli').Migration} */
const { v4: uuidv4 } = require('uuid');
module.exports = {
    async up(queryInterface, Sequelize) {
        const empresas = await queryInterface.sequelize.query('SELECT id FROM empresas', { type: queryInterface.sequelize.QueryTypes.SELECT });

        // Array para armazenar todas as inserções de seeds
        const seeds = [];

        // Iterar sobre cada empresa
        empresas.forEach(empresa => {
            seeds.push(
                {
                    id: uuidv4(),
                    empresa_id: empresa.id,
                    nome: 'Administrador',
                    nivel: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                    deleted_at: null
                },
                {
                    id: uuidv4(),
                    empresa_id: empresa.id,
                    nome: 'Usuário Comum',
                    nivel: 2,
                    created_at: new Date(),
                    updated_at: new Date(),
                    deleted_at: null
                }
                // Adicione mais linhas conforme necessário
            );
        });

        // Inserir todas as seeds
        await queryInterface.bulkInsert('tipos_usuarios', seeds, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('tipos_usuarios', null, {});
    }
};
