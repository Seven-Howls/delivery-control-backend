'use strict';
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        dotenv.config();
        const users = [];
        const rounds = Number(process.env.BCRYPT_COST);
        const salt = await bcrypt.genSalt(rounds);
        const hash = await bcrypt.hash('12345', salt)
        // Criar 8 usuários de exemplo
        for (let i = 1; i <= 15; i++) {
            const cpf = `1234567890${i}`
            let resultado;

            if (cpf.length >= 11) {
                resultado = cpf.substring(cpf.length - 11);
            } else {
                resultado = cpf;
            }

            users.push({
                id: uuidv4(),
                nome: `Usuário ${i}`,
                cpf: resultado, 
                senha: hash,
                celular: Number(`7654321${i}`), 
                created_at: new Date(),
                updated_at: new Date(),
                deleted_at: i % 5 ? null : new Date()
            });
        }

        // Inserir os usuários na tabela
        await queryInterface.bulkInsert('usuarios', users, {});
    },
    down: async (queryInterface, Sequelize) => {
        // Remover todos os usuários
        await queryInterface.bulkDelete('usuarios', null, {});
    }
};
