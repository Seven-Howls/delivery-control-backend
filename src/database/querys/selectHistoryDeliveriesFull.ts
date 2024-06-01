export const selectHistoryDeliveriesFull = `
SELECT 
    COUNT(e.id) AS numero_entregas,
    DATE(e.created_at) AS data_entrega,
    SUM(e.valor_liquido) AS valor_total,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', e.id,
            'taxa_entrega', JSON_OBJECT('id', te.id, 'descricao', te.descricao, 'valor', te.valor),
            'motoboy', JSON_OBJECT('id', m.id, 'nome', u.nome, 'celular', u.celular),
            'metodo_pagamento', JSON_OBJECT('id', mp.id, 'nome', mp.nome),
            'status', JSON_OBJECT('id', s.id, 'nome', s.nome),
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
JOIN taxas_entregas AS te ON e.taxa_entrega_id = te.id
JOIN metodos_pagamentos AS mp ON e.metodo_pagamento_id = mp.id
JOIN status AS s ON e.status_id = s.id
WHERE e.motoboy_id = :motoboyId
AND e.deleted_at IS NULL
GROUP BY data_entrega
`;
