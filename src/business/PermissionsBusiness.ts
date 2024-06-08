import { CompanyData } from "../data/CompanyData";
import { Authenticator } from "../services/Authenticator";
import { CustomError } from "../utils/CustomError";
import { IUserTypeData } from "../models/InterfaceUserType";

export class PermissionBusiness {
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

            const userType = await this.userTypeData.findById(isAuthorized.roleId as string);
            if(!userType ) throw new CustomError("Não foi encontrado o seu tipo de usuario", 404);

            const permissions = await this.userTypeData.findPermissionByUserType(userType.id)
            return permissions
        }catch(error: any){
            throw new CustomError(error.message, error.statusCode);
        }
    }
}
