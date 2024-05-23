export const selectHistoryDeliveriesFull = `
SELECT 
    COUNT(e.id) AS numero_entregas,
    DATE(e.created_at) AS data_entrega,
    SUM(e.valor_liquido) AS valor_total,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', e.id,
            'taxas_entregas', (SELECT JSON_OBJECT('id', te.id, 'descricao', te.descricao) FROM taxa_entregas AS te WHERE te.id = e.taxa_entrega_id),
            'motoboy', JSON_OBJECT('id', m.id, 'nome', u.nome),
            'metodos_pagamentos', (SELECT JSON_OBJECT('id', mp.id, 'nome', mp.nome) FROM metodos_pagamentos AS mp WHERE mp.id = e.metodo_pagamento_id),
            'status', (SELECT JSON_OBJECT('id', s.id, 'nome', s.nome) FROM status AS s WHERE s.id = e.status_id),
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
JOIN motoboys AS m ON e.motoboy_id = m.id
JOIN usuarios AS u ON m.usuario_id = u.id
WHERE e.motoboy_id = :motoboyId
AND e.deleted_at IS NULL
GROUP BY data_entrega;
`;
