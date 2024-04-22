'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Buscar os IDs das taxas de entrega, motoboys, métodos de pagamento e status
    const taxasEntregas = await queryInterface.sequelize.query('SELECT id FROM taxas_entregas;', {
      type: Sequelize.QueryTypes.SELECT
    }).then(results => results.map(result => result.id));

    const motoboys = await queryInterface.sequelize.query('SELECT id FROM motoboys;', {
      type: Sequelize.QueryTypes.SELECT
    }).then(results => results.map(result => result.id));

    const metodosPagamentos = await queryInterface.sequelize.query('SELECT id FROM metodos_pagamentos;', {
      type: Sequelize.QueryTypes.SELECT
    }).then(results => results.map(result => result.id));

    const status = await queryInterface.sequelize.query('SELECT id FROM status;', {
      type: Sequelize.QueryTypes.SELECT
    }).then(results => results.map(result => result.id));

    // Gerar um array de entregas de exemplo
    const entregas = [];

    // Definir o número de entregas de exemplo
    const numEntregas = 1000;

    // Loop para criar entregas de exemplo
    for (let i = 1; i <= numEntregas; i++) {
      const random = Math.floor(Math.random() * 3);
      const taxaEntregaId = taxasEntregas[Math.floor(Math.random() * taxasEntregas.length)];
      const motoboyId = motoboys[Math.floor(Math.random() * motoboys.length)];
      const metodoPagamentoId = metodosPagamentos[Math.floor(Math.random() * metodosPagamentos.length)];
      const statusId = status[Math.floor(Math.random() * status.length)];
      const valorProduto = Math.floor(Math.random() * 100) + 1; // Valor do produto aleatório entre 1 e 100
      const taxaServico = Math.floor(Math.random() * 20) + 1; // Taxa de serviço aleatória entre 1 e 20
      const today = new Date();
      const date = new Date(today);
      date.setDate(today.getDate() - random)
      entregas.push({
        id: uuidv4(),
        taxa_entrega_id: taxaEntregaId,
        motoboy_id: motoboyId,
        metodo_pagamento_id: metodoPagamentoId,
        status_id: statusId,
        valor_produto: valorProduto,
        taxa_servico: taxaServico,
        valor_liquido: valorProduto + taxaServico, // Valor líquido é a soma do valor do produto e da taxa de serviço
        comanda_id: Math.floor(Math.random() * 1000) + 1, // ID da comanda aleatório entre 1 e 1000
        created_at: date,
        updated_at: date,
        deleted_at: i % 5 ? null : date
      });
    }

    // Inserir as entregas na tabela 'entregas'
    await queryInterface.bulkInsert('entregas', entregas, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remover todas as entregas inseridas pela seed
    await queryInterface.bulkDelete('entregas', null, {});
  }
};
