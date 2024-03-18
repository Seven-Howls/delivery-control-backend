'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('permissoes',[
            {id: uuidv4(), nome: "Criar entrega", nivel: 1, created_at: new Date(),updated_at: new Date()},
            {id: uuidv4(), nome: "Excluir entrega", nivel: 2, created_at: new Date(),updated_at: new Date()},
            {id: uuidv4(), nome: "Cadastrar motoboy", nivel: 3, created_at: new Date(),updated_at: new Date()},
            {id: uuidv4(), nome: "Excluir motoboy", nivel: 4, created_at: new Date(),updated_at: new Date()},
            {id: uuidv4(), nome: "Criar motoboy", nivel: 5, created_at: new Date(),updated_at: new Date()},
            {id: uuidv4(), nome: "Reecriar entrega", nivel: 6, created_at: new Date(),updated_at: new Date(),deleted_at: new Date()}
        ])
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('permissoes', null, {});
    }
};
