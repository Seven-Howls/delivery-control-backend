import { DataTypes, Model } from "sequelize";
import { Database } from "../database/sequelize";
const databese = new Database();

export interface    Permissoes{
    id:string;
    nome:string;
    nivel: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

export interface PermissoesInstance extends Model<Permissoes>,Permissoes {}

export const Permissoes = databese.sequelize.define<PermissoesInstance,Permissoes>("Permissoes",{
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
