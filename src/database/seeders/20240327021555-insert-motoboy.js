'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Buscar os IDs das empresas e usuários
    const empresas = await queryInterface.sequelize.query('SELECT id FROM empresas;', {
      type: Sequelize.QueryTypes.SELECT
    }).then(results => results.map(result => result.id));

    const usuarios = await queryInterface.sequelize.query('SELECT id FROM usuarios;', {
      type: Sequelize.QueryTypes.SELECT
    }).then(results => results.map(result => result.id));

    // Gerar um array de motoboys de exemplo
    const motoboys = [];

    // Definir o número de motoboys de exemplo
    const numMotoboys = 25;

    // Loop para criar motoboys de exemplo
    for (let i = 1; i <= numMotoboys; i++) {
      const empresaId = empresas[Math.floor(Math.random() * empresas.length)];
      const usuarioId = usuarios[Math.floor(Math.random() * usuarios.length)];

      motoboys.push({
        id: uuidv4(),
        empresa_id: empresaId,
        usuario_id: usuarioId,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: i % 5 ? null : new Date()
      });
    }

    // Inserir os motoboys na tabela 'motoboys'
    await queryInterface.bulkInsert('motoboys', motoboys, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remover todos os motoboys inseridos pela seed
    await queryInterface.bulkDelete('motoboys', null, {});
  }
};
