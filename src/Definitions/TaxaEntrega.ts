import { DataTypes } from "sequelize";
import { Database } from "../database/sequelize";
import { TaxaEntregaInstance, ITaxaEntrega } from "../models/InterfaceTaxaEntrega";

const database = new Database()

export const TaxaEntrega = database.sequelize.define<TaxaEntregaInstance, ITaxaEntrega>('TaxaEntrega',{
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    empresaId: {
        allowNull: false,
        type: DataTypes.STRING,
        references:{
            model: 'empresas',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    descricao:{
        allowNull: false,
        type: DataTypes.STRING
    },
    valor:{
        type: DataTypes.INTEGER,
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
