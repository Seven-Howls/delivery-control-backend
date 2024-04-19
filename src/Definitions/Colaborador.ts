import { DataTypes } from "sequelize";
import { Database } from "../database/sequelize";
import { CollaboratorInstance, ICollaborator } from "../models/InterfaceCollaborator";

const database = new Database()

export const Collaborator = database.sequelize.define<CollaboratorInstance, ICollaborator>('Colaboradores',{
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    tipoId: {
        allowNull: false,
        type: DataTypes.STRING,
        references:{
            model: 'tipos_usuarios',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
