'use strict';
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const permissoes = await queryInterface.sequelize.query('SELECT id FROM permissoes', { type: queryInterface.sequelize.QueryTypes.SELECT });

        // Consultar todos os tipos de usuários da base de dados
        const tiposUsuarios = await queryInterface.sequelize.query('SELECT id FROM tipos_usuarios', { type: queryInterface.sequelize.QueryTypes.SELECT });

        // Array para armazenar todas as inserções de seeds
        const seeds = [];

        // Iterar sobre cada permissão e cada tipo de usuário para criar as relações
        permissoes.forEach(permissao => {
            tiposUsuarios.forEach(tipoUsuario => {
                seeds.push(
                    {
                        id: uuidv4(),
                        permissao_id: permissao.id,
                        tipo_usuario_id: tipoUsuario.id,
                        created_at: new Date(),
                        updated_at: new Date(),
                        deleted_at: null
                    }
                    // Adicione mais linhas conforme necessário
                );
            });
        });

        // Inserir todas as seeds
        await queryInterface.bulkInsert('permissoes_tipos_usuarios', seeds, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('permissoes_tipos_usuarios', null, {});
    }
};
