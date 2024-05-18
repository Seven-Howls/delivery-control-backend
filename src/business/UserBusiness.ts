import { threadId } from "worker_threads";
import { CompanyData } from "../data/CompanyData";
import { UserTypePermissionsData } from "../data/UserTypePermissionsData";
import { IUserData } from "../models/interfaceUser";
import { Authenticator } from "../services/Authenticator";
import { TCreateUserData } from "../types/TCreateUserData";
import { CustomError } from "../utils/CustomError";
import { isNullOrUndefinedOrEmpty } from "../utils/isNullOrUndefinedOrEmpty";

export class UserBusiness {
    private userData: IUserData;
    private companyData: CompanyData;
    private userTypePermissionsData: UserTypePermissionsData;
    private authenticator: Authenticator;

    constructor(
        userData: IUserData,
        companyData: CompanyData, 
        userTypePermissionsData: UserTypePermissionsData
    ) {
        this.userData = userData;
        this.companyData = companyData;
        this.userTypePermissionsData = userTypePermissionsData;
        this.authenticator = new Authenticator();
    }

    updateUser = async (token:string ,id:string ,data:TCreateUserData) => {
        try{
            if(!token) throw new CustomError("Token ausente",422)
            const isAuthorized = this.authenticator.getTokenData(token);
            if(!isAuthorized) if(!isAuthorized) throw new CustomError("Não autorizado", 401);
            if(isNullOrUndefinedOrEmpty(data)) throw new CustomError("Dados obrigatorios do usuario não enviados", 422);

            const company = await this.companyData.findById(isAuthorized.companyId);
            if(!company) throw new CustomError("Empresa não encontrada", 404);

            const userTypePermissions = await this.userTypePermissionsData.findByTypeUserAndLevel(isAuthorized.roleId as string, 9)
            if(!userTypePermissions) throw new CustomError("Seu perfil não esta autorizado a usar essa funcinalidade", 401);

            const user = await this.userData.findById(id);
            if(!user) throw new CustomError("Usuario nao encontrado não encontrado", 404);

            const userUpdate = {
                nome: data.nome,
                cpf: data.cpf,
                celular: data.celular,
                email: data.email,
                deletedAt: null
            }
            await this.userData.updateUser(userUpdate);  
        }catch(error: any){
            throw new CustomError(error.message, error.statusCode);
        }
    }
}
