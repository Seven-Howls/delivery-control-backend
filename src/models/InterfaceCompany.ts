import { Model } from "sequelize";

interface ICompany {
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

interface CompanyInstance extends Model<ICompany>, ICompany { }

interface ICompanyData{
    findById(id: string): Promise<ICompany | null>
    findAllByUser(cpf:string): Promise< ICompany[] | null >
}

export {
    ICompany,
    CompanyInstance,
    ICompanyData
}
