import { CompanyData } from "../data/CompanyData";
import { Authenticator } from "../services/Authenticator";
import { CustomError } from "../utils/CustomError";
import { IUserTypeData } from "../models/InterfaceUserType";

export class UserTypeBusiness {
    private userTypeData: IUserTypeData;
    private companyData: CompanyData;
    private authenticator: Authenticator;

    constructor(
        userTypeData: IUserTypeData, 
        companyData: CompanyData
    ) {
        this.userTypeData = userTypeData;
        this.companyData = companyData;
        this.authenticator = new Authenticator();
    }

    findAll = async (token: string) => {
        try{
            if(!token) throw new CustomError("Token ausente",422)
            const isAuthorized = this.authenticator.getTokenData(token);
            if(!isAuthorized) if(!isAuthorized) throw new CustomError("Não autorizado", 401);

            const company = await this.companyData.findById(isAuthorized.companyId);
            if(!company) throw new CustomError("Empresa não encontrada", 404);

            const userTypes = await this.userTypeData.findAll(isAuthorized.companyId);
            if(!userTypes) throw new CustomError("Não foram encontrados tipos de usuarios", 404);

            return userTypes
        }catch(error: any){
            throw new CustomError(error.message, error.statusCode);
        }
    }
}
