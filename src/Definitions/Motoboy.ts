import { DataTypes } from "sequelize";
import { Database } from "../database/sequelize";
import { MotoboyInstance, IMotoboy } from "../models/InterfaceMotoboy";

const database = new Database()

export const Motoboy = database.sequelize.define<MotoboyInstance, IMotoboy>('Motoboy',{
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
    usuarioId: {
        allowNull: false,
        type: DataTypes.STRING,
        references:{
            model: 'usuarios',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
