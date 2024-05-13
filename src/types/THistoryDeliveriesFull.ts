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