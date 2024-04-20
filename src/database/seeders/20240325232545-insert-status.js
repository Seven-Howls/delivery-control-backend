'use strict';
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('status', [
          {
            nome: 'Em andamento',
            nivel: 1,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
          },
          {
            nome: 'Concluído',
            nivel: 2,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
          },
          {
            nome: 'Cancelado',
            nivel: 3,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
          },
          {
            nome: 'Cancelad',
            nivel: 3,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: new Date()
          }
          // Adicione mais linhas conforme necessário
        ], {});
      },
    
      down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('status', null, {});
      }
};
