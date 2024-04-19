import { DataTypes } from "sequelize";
import { Database } from "../database/sequelize";
import { UserInstance, IUser } from "../models/interfaceUser";

const database = new Database()

export const User = database.sequelize.define<UserInstance, IUser>('Usuario',{
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    nome: {
        allowNull: false,
        type: DataTypes.STRING
    },
    cpf: {
        type: DataTypes.STRING(11),
        unique: true,
        allowNull: false
    },
    senha: {
        allowNull: false,
        type: DataTypes.STRING
    },
    celular: {
        allowNull: false,
        type: DataTypes.BIGINT
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
