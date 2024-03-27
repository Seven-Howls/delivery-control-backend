import { DataTypes } from "sequelize";
import { Database } from "../database/sequelize";
import { UsuarioInstance, IUsuario } from "../models/interfaceUsuario";

const database = new Database()

export const Usuario = database.sequelize.define<UsuarioInstance, IUsuario>('Usuario',{
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
