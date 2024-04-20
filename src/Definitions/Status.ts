import { DataTypes } from "sequelize";
import { Database } from "../database/sequelize";
import { StatusInstance, IStatus } from "../models/InterfaceStatus";

const database = new Database()

export const Status = database.sequelize.define<StatusInstance, IStatus>('Status',{
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    nome:{
        allowNull: false,
        type: DataTypes.STRING
    },
    nivel:{
        allowNull:false,
        type: DataTypes.INTEGER
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
},{tableName: 'status'})
