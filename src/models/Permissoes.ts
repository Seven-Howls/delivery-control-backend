import { DataTypes } from "sequelize";
import { Database } from "../database/sequelize";
import { PermissoesInterface, PermissoesInstance } from "../Interfaces/Permissoes";

const databese = new Database();

export const Permissoes = databese.sequelize.define<PermissoesInstance,PermissoesInterface>("Permissoes",{
    id:{
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
