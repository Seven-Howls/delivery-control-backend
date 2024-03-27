import { Model } from "sequelize";

interface IEmpresas {
    id: string,
    razaoSocial: string,
    cnpj: string,
    cpf: string,
    nomeFantasia: string,
    cep: number,
    rua: string,
    bairro: string,
    cidade: string,
    estado: string,
    numero: number,
    urlLogo: string,
    createdAt: Date,
    updatedAt:  Date,
    deletedAt: Date | null
}

interface EmpresasInstance extends Model<IEmpresas>, IEmpresas { }

export {
    IEmpresas,
    EmpresasInstance
}
