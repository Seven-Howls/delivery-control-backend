import { DataTypes } from "sequelize";
import { Database } from "../database/sequelize";
import { EmpresasInstance, IEmpresas } from "../models/InterfaceEmpresas";

const database = new Database()

export const Empresas = database.sequelize.define<EmpresasInstance, IEmpresas>('Empresas',{
    id: {
        primaryKey: true,
        type: DataTypes.STRING,
        allowNull: false
    },
    razaoSocial:{
        allowNull: false,
        type: DataTypes.STRING
    },
    cnpj:{
        type: DataTypes.STRING(14),
        unique: true
    },
    cpf:{
        type: DataTypes.STRING(11),
        unique: true
    },
    nomeFantasia:{
        allowNull: false,
        type: DataTypes.STRING
    },
    cep:{
        allowNull: false,
        type: DataTypes.INTEGER
    },
    rua:{
        allowNull: false,
        type: DataTypes.STRING
    },
    bairro:{
        allowNull: false,
        type: DataTypes.STRING
    },
    cidade:{
        allowNull: false,
        type: DataTypes.STRING
    },
    estado:{
        allowNull: false,
        type: DataTypes.STRING(2)
    },
    numero:{
        allowNull: false,
        type: DataTypes.INTEGER
    },
    urlLogo:{
        allowNull: false,
        type: DataTypes.STRING
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