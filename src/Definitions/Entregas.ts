import { DataTypes } from "sequelize";
import { Database } from "../database/sequelize";
import { EntregasInstance, IEntregas } from "../models/InterfaceEntregas";

const database = new Database()

export const Entregas = database.sequelize.define<EntregasInstance, IEntregas>('Entregas',{
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    taxaEntregaId: {
        allowNull: false,
        type: DataTypes.STRING,
        references:{
            model: 'taxas_entregas',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    motoboyId: {
        allowNull: false,
        type: DataTypes.STRING,
        references:{
            model: 'motoboys',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    metodoPagamentoId: {
        allowNull: false,
        type: DataTypes.STRING,
        references:{
            model: 'metodos_pagamentos',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    statusId: {
        allowNull: false,
        type: DataTypes.STRING,
        references:{
            model: 'status',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    valorProduto: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    taxaServico: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    valorLiquido: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    comandaId: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
    deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
    }
})
