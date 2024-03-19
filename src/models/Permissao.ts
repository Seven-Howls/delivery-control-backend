import { DataTypes, Model } from "sequelize";
import { Database } from "../database/sequelize";
const databese = new Database();

export interface Permissao {
    id:string;
    nome:string;
    nivel: number,
    created_at: Date,
    updated_at: Date,
    deleted_at: Date
}

export interface PermissaoInstance extends Model<Permissao>,Permissao {}

export const Permissao = databese.sequelize.define<PermissaoInstance,Permissao>("Permissao",{
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
    created_at: {
        allowNull: false,
        type: DataTypes.DATE
    },
    updated_at: {
        allowNull: false,
        type: DataTypes.DATE
    },
    deleted_at: {
        allowNull: true,
        type: DataTypes.DATE
    }
})