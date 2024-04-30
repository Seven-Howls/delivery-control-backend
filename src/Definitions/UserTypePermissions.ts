import { DataTypes } from "sequelize";
import { Database } from "../database/sequelize";
import { UserTypePermissionsInstance, IUserTypePermissions } from "../models/InterfaceUserTypePermissions";

const database = new Database()

export const UserTypePermissions = database.sequelize.define<UserTypePermissionsInstance, IUserTypePermissions>('PermissoesTipoUsuario',{
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    permissaoId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'permissoes',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    tipoUsuarioId: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
            model: 'tipos_usuarios',
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
