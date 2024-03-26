'use strict';
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('metodos_pagamentos', [
          {
            id: uuidv4(),
            nome: 'Cartão de Crédito',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
          },
          {
            id: uuidv4(),
            nome: 'Transferência Bancária',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
          },
          {
            id: uuidv4(),
            nome: 'Boleto Bancário',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
          },
          {
            id: uuidv4(),
            nome: 'Boleto',
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: new Date()
          }
          // Adicione mais linhas conforme necessário
        ], {});
      },
    
    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('metodos_pagamentos', null, {});
      }
};
