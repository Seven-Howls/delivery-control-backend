export const selectHistoryDeliveryAll = `
SELECT 
    COUNT(e.id) AS numero_entregas,
    DATE(e.created_at) AS data_entrega,
    SUM(e.valor_liquido) AS valor_total,
    JSON_ARRAYAGG(
        JSON_OBJECT(
            'id', e.id,
            'taxas_entrega', (SELECT JSON_OBJECT('id', te.id, 'descricao', te.descricao, 'valor', te.valor) FROM taxas_entregas AS te WHERE te.id = e.taxa_entrega_id),
            'motoboy', (SELECT JSON_OBJECT('id', m.id, 'usuario_id', m.usuario_id, 'nome', u.nome, 'telefone', u.celular) FROM motoboys AS m INNER JOIN usuarios AS u ON m.usuario_id = u.id WHERE m.id = e.motoboy_id),
            'metodo_pagamento', (SELECT JSON_OBJECT('id', mp.id, 'descricao', mp.nome) FROM metodos_pagamentos AS mp WHERE mp.id = e.metodo_pagamento_id),
            'status', (SELECT JSON_OBJECT('id', s.id, 'descricao', s.nome) FROM status AS s WHERE s.id = e.status_id),
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
INNER JOIN motoboys m
ON m.id = e.motoboy_id
INNER JOIN empresas e2 
ON e2.id = m.empresa_id
WHERE e.deleted_at IS NULL AND e2.id = :companyId
GROUP BY data_entrega
`;
