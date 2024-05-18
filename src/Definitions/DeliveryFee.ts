import { DataTypes } from "sequelize";
import { Database } from "../database/sequelize";
import { DeliveryFeeInstance, IDeliveryFee } from "../models/InterfaceDeliveryFee";

const database = new Database()

export const DeliveryFee = database.sequelize.define<DeliveryFeeInstance, IDeliveryFee>('TaxasEntrega',{
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
