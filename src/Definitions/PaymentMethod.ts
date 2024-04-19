import { DataTypes } from "sequelize";
import { Database } from "../database/sequelize";
import { PaymentMethodInstance, IPaymentMethod } from "../models/InterfacePaymentMethod";

const database = new Database()

export const PaymentMethod = database.sequelize.define<PaymentMethodInstance, IPaymentMethod>('MetodoPagamento',{
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
