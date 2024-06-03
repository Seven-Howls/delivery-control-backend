export type THistoryDeliveriesFullPagination = {
  page: number,
  perPage: number,
  total: number,
  entregas: TDeliveriesFull[]
}

export type TDeliveriesFull = {

    id: string,
    valorProduto: number,
    taxaServico: number,
    valorLiquido: number,
    comandaId: number,
    createdAt: string,
    updatedAt: string,
    motoboy: {
        id: string,
        usuarioId: string,
        empresaId: string
    },
    deliveriesStatus: {
        id: string,
        nivel: number,
        nome: string
    },
    taxaEntrega: {
        id: string,
        valor: number,
        descricao: string
    },
    metodoPagamento: {
        id: string,
        nome: string
    }
}


export type THistoryDeliveriesFull = {
  numero_entregas: number,
  data_entrega: Date,
  valor_total: number,
  entregas: [
      {
          id: string
          taxa_entrega_id: Object,
          motoboy_id: Object,
          metodo_pagamento_id: Object,
          status_id: Object,
          valor_produto: number,
          taxa_servico: number,
          valor_liquido: number,
          comanda_id: string,
          created_at: Date,
          updated_at: Date,
          deleted_at: Date
      }
  ]
}