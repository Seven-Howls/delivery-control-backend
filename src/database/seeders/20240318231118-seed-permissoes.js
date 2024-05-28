'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('permissoes',[
            {id: 1, nome: "Criar entrega", nivel: 1, created_at: new Date(),updated_at: new Date()},
            {id: 2, nome: "Excluir entrega", nivel: 2, created_at: new Date(),updated_at: new Date()},
            {id: 3, nome: "Cadastrar motoboy", nivel: 3, created_at: new Date(),updated_at: new Date()},
            {id: 4, nome: "Excluir motoboy", nivel: 4, created_at: new Date(),updated_at: new Date()},
            {id: 5, nome: "Criar motoboy", nivel: 5, created_at: new Date(),updated_at: new Date()},
            {id: 6, nome: "Excluir entrega", nivel: 6, created_at: new Date(),updated_at: new Date()},
            {id: 7, nome: "Cadastrar colaborado", nivel: 7, created_at: new Date(),updated_at: new Date()},
            {id: 8, nome: "Excluir colaborado", nivel: 8, created_at: new Date(),updated_at: new Date()},
            {id: 9, nome: "Editar usuario", nivel: 9, created_at: new Date(),updated_at: new Date()},
            {id: 10, nome: "Editar taxa de entrega", nivel: 10, created_at: new Date(),updated_at: new Date()}
        ]
    )},
    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('permissoes', null, {});
    }
}
