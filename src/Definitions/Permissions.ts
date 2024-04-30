import { DataTypes } from "sequelize"
import { PermissionsInstance, IPermissions } from "../models/InterfacePermissions"
import { Database } from "../database/sequelize"

const databese = new Database();

export const Permissions = databese.sequelize.define<PermissionsInstance, IPermissions>("Permissoes", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
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
