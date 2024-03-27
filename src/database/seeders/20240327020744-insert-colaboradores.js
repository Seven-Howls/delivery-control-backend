'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Buscar os IDs dos tipos de usuários, empresas e usuários
    const tiposUsuarios = await queryInterface.sequelize.query('SELECT id FROM tipos_usuarios;', {
      type: Sequelize.QueryTypes.SELECT
    }).then(results => results.map(result => result.id));

    const empresas = await queryInterface.sequelize.query('SELECT id FROM empresas;', {
      type: Sequelize.QueryTypes.SELECT
    }).then(results => results.map(result => result.id));

    const usuarios = await queryInterface.sequelize.query('SELECT id FROM usuarios;', {
      type: Sequelize.QueryTypes.SELECT
    }).then(results => results.map(result => result.id));

    // Gerar um array de colaboradores de exemplo
    const colaboradores = [];

    // Definir o número de colaboradores de exemplo
    const numColaboradores = 15;

    // Loop para criar colaboradores de exemplo
    for (let i = 1; i <= numColaboradores; i++) {
      const tipoUsuarioId = tiposUsuarios[Math.floor(Math.random() * tiposUsuarios.length)];
      const empresaId = empresas[Math.floor(Math.random() * empresas.length)];
      const usuarioId = usuarios[Math.floor(Math.random() * usuarios.length)];

      colaboradores.push({
        id: uuidv4(),
        tipo_id: tipoUsuarioId,
        empresa_id: empresaId,
        usuario_id: usuarioId,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: i % 5 ? null : new Date()
      });
    }

    // Inserir os colaboradores na tabela 'colaboradores'
    await queryInterface.bulkInsert('colaboradores', colaboradores, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remover todos os colaboradores inseridos pela seed
    await queryInterface.bulkDelete('colaboradores', null, {});
  }
};
