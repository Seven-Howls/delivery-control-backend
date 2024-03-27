'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const types = Sequelize.DataTypes
        await queryInterface.createTable('empresas',{
            id: {
                primaryKey: true,
                type: types.STRING,
                allowNull: false
            },
            razao_social:{
                allowNull: false,
                type: types.STRING
            },
            cnpj:{
                type: types.STRING(14),
                unique: true
            },
            cpf:{
                type: types.STRING(11),
                unique: true
            },
            nome_fantasia:{
                allowNull: false,
                type: types.STRING
            },
            cep:{
                allowNull: false,
                type: types.INTEGER
            },
            rua:{
                allowNull: false,
                type: types.STRING
            },
            bairro:{
                allowNull: false,
                type: types.STRING
            },
            cidade:{
                allowNull: false,
                type: types.STRING
            },
            estado:{
                allowNull: false,
                type: types.STRING(2)
            },
            numero:{
                allowNull: false,
                type: types.INTEGER
            },
            url_logo:{
                allowNull: false,
                type: types.STRING
            },
            created_at: {
                allowNull: false,
                type: types.DATE
            },
            updated_at: {
                allowNull: false,
                type: types.DATE
            },
            deleted_at: {
                allowNull: true,
                type: types.DATE
            }
        })
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('empresas');
    }
};
