export const selectHistoryDeliveries = `
SELECT 
    COUNT(e.id) AS numero_entregas,
    DATE(e.created_at) AS data_entrega,
    SUM(e.valor_liquido) AS valor_total,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', e.id,
            'taxa_entrega_id', e.taxa_entrega_id,
            'motoboy_id', e.motoboy_id,
            'metodo_pagamento_id', e.metodo_pagamento_id,
            'status_id', e.status_id,
            'valor_produto', e.valor_produto,
            'taxa_servico', e.taxa_servico,
            'valor_liquido', e.valor_liquido,
            'comanda_id', e.comanda_id,
            'created_at', e.created_at,
            'updated_at', e.updated_at,
            'deleted_at', e.deleted_at
        )
    ) AS entregas_dados
FROM entregas AS e
WHERE e.motoboy_id = :motoboyId
AND e.deleted_at IS NULL
GROUP BY data_entrega;`