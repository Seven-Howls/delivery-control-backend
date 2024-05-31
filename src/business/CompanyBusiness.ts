import { companyRouter } from './../router/companyRouter';
import { CompanyData } from './../data/CompanyData';
import { Authenticator } from "../services/Authenticator";
import { CustomError } from "../utils/CustomError";
import { isNullOrUndefinedOrEmpty } from "../utils/isNullOrUndefinedOrEmpty";
import { ICompany } from '../models/InterfaceCompany';

export class CompanyBusiness {
    private companyData: CompanyData;
    private authenticator: Authenticator;

    constructor(
        companyData: CompanyData,
    ) {
        this.companyData = companyData;
        this.authenticator = new Authenticator();
    }

    getCompanyUser = async (cpf: string): Promise<ICompany[] | null> => {
        try {
            if (!cpf) throw new CustomError("Campos inválidos", 422);
            const companies = await this.companyData.findAllByUser(cpf)
            return companies
        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode);
        }
    }

    getCompany = async (): Promise<ICompany[] | null> => {
        try {
            const companies = await this.companyData.findAll()
            return companies
        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode);
        }
    }
}
