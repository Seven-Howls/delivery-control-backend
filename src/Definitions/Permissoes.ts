import { DataTypes } from "sequelize"
import { PermissoesInstance, IPermissoes } from "../models/InterfacePermissoes"
import { Database } from "../database/sequelize"

const databese = new Database();

export const Permissoes = databese.sequelize.define<PermissoesInstance, IPermissoes>("Permissoes", {
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false,
    },
    nome: {
        allowNull: false,
        type: DataTypes.STRING
    },
    nivel: {
        allowNull: false,
        unique: true,
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
})
