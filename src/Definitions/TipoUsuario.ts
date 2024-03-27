import { DataTypes } from "sequelize";
import { Database } from "../database/sequelize";
import { TipoUsuarioInstance, ITipoUsuario } from "../models/InterfaceTipoUsuario";

const database = new Database()

export const TipoUsuario = database.sequelize.define<TipoUsuarioInstance, ITipoUsuario>('TipoUsuario',{
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
    nome:{
        allowNull: false,
        type: DataTypes.STRING
    },
    nivel:{
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
