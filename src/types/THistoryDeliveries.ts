export type THistoryDeliveries = {
    numero_entregas: number,
    data_entrega: Date,
    valor_total: number,
    entregas: [
        {
            id: string
            taxa_entrega_id: number,
            motoboy_id: string,
            metodo_pagamento_id: string,
            status_id: number,
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