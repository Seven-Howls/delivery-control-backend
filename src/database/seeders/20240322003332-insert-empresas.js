'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('empresas', [
        {
          id: uuidv4(),
          razao_social: 'Empresa ABC LTDA',
          cnpj: '12345678000100',
          nome_fantasia: 'ABC',
          cep: 12345678,
          rua: 'Rua ABC',
          bairro: 'Centro',
          cidade: 'São Paulo',
          estado: 'SP',
          numero: 123,
          url_logo: 'http://exemplo.com/logo1.jpg',
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null
        }
      ]);
      
      // Insert 2
      await queryInterface.bulkInsert('empresas', [
        {
          id: uuidv4(),
          razao_social: 'Empresa XYZ LTDA',
          cnpj: '98765432000100',
          nome_fantasia: 'XYZ',
          cep: 87654321,
          rua: 'Rua XYZ',
          bairro: 'Bairro XYZ',
          cidade: 'Rio de Janeiro',
          estado: 'RJ',
          numero: 456,
          url_logo: 'http://exemplo.com/logo2.jpg',
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null
        }
      ]);
      
      // Insert 3
      await queryInterface.bulkInsert('empresas', [
        {
          id: uuidv4(),
          razao_social: 'Empresa QWE LTDA',
          cpf: '12345678900',
          nome_fantasia: 'QWE',
          cep: 13579246,
          rua: 'Rua QWE',
          bairro: 'Bairro QWE',
          cidade: 'Curitiba',
          estado: 'PR',
          numero: 789,
          url_logo: 'http://exemplo.com/logo3.jpg',
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null
        }
      ]);
      
      // Insert 4
      await queryInterface.bulkInsert('empresas', [
        {
          id: uuidv4(),
          razao_social: 'Empresa Teste LTDA',
          cnpj: '11223344556677',
          nome_fantasia: 'Teste',
          cep: 55443322,
          rua: 'Rua Teste',
          bairro: 'Bairro Teste',
          cidade: 'Porto Alegre',
          estado: 'RS',
          numero: 321,
          url_logo: 'http://exemplo.com/logo4.jpg',
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: new Date()
        }
      ]);
      
      // Insert 5
      await queryInterface.bulkInsert('empresas', [
        {
          id: uuidv4(),
          razao_social: 'Empresa Example LTDA',
          cnpj: '99887766554433',
          nome_fantasia: 'Example',
          cep: 98765432,
          rua: 'Rua Example',
          bairro: 'Bairro Example',
          cidade: 'Belo Horizonte',
          estado: 'MG',
          numero: 654,
          url_logo: 'http://exemplo.com/logo5.jpg',
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null
        }
      ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('empresas', null, {});
  }
};
