'use strict';

const { default: test } = require('node:test');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const types = Sequelize.DataTypes
        await queryInterface.addColumn('usuarios','email',{
            allowNull: false,
            defaultValue: 'test@test.com',
            type: types.STRING,
            unique: true
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("usuarios",'email');
    }
    
};
