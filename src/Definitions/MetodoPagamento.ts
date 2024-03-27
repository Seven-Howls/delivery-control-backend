import { DataTypes } from "sequelize";
import { Database } from "../database/sequelize";
import { MetodoPagamentoInstance, IMetodoPagamento } from "../models/InterfaceMetodoPagamento";

const database = new Database()

export const MetodoPagamento = database.sequelize.define<MetodoPagamentoInstance, IMetodoPagamento>('MetodoPagamento',{
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    nome:{
        allowNull: false,
        type: DataTypes.STRING
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
