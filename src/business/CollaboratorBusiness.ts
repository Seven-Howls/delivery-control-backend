import { ICollaboratorData } from "../models/InterfaceCollaborator";
import { ICompanyData } from "../models/InterfaceCompany";
import { IUserTypeData } from "../models/InterfaceUserType";
import { IUserTypePermissionsData } from "../models/InterfaceUserTypePermissions";
import { IUserData } from "../models/interfaceUser";
import { Authenticator } from "../services/Authenticator";
import { SecurePasswordHandler } from "../services/SecurePasswordHandler";
import { TLoginData } from "../types/TLoginData";
import { TSignupUserData } from "../types/TSignupUserData";
import { CustomError } from "../utils/CustomError";

export class CollaboratorBusiness {
    private userData: IUserData;
    private collaboratorData: ICollaboratorData;
    private userTypePermissionsData: IUserTypePermissionsData;
    private companyData : ICompanyData;
    private userTypeData : IUserTypeData;
    private securePassword: SecurePasswordHandler;
    private authenticator: Authenticator;

    constructor(
        userData: IUserData, 
        collaboratorData: ICollaboratorData, 
        userTypePermissionsData: IUserTypePermissionsData, 
        companyData: ICompanyData,
        userTypeData: IUserTypeData
    ) {
        this.userData = userData;
        this.collaboratorData = collaboratorData;
        this.userTypePermissionsData = userTypePermissionsData;
        this.companyData = companyData;
        this.userTypeData = userTypeData;
        this.securePassword = new SecurePasswordHandler();
        this.authenticator = new Authenticator();
    }

    signup = async (dataUser: TSignupUserData, companyId: string, typeId: string, token: string) => {
        try {
            if(!dataUser) throw new CustomError("Parametros obrigatorios do usuario não enviados", 422);

            if(!companyId) throw new CustomError("companyId não enviado", 422);
        
            const company = await this.companyData.findById(companyId);
            if(!company) throw new CustomError("Empresa não encontrada", 404);

            if(!typeId) throw new CustomError("typeId não enviado", 422);
            if(!token) throw new CustomError("Token ausente na autenticação",422);

            const isAuthorized = this.authenticator.getTokenData(token);
            if(!isAuthorized) throw new CustomError("Não autorizado", 401);
            
            const collaboratorCreated = await this.collaboratorData.findById(isAuthorized.id);
            if(!collaboratorCreated) throw new CustomError("Usuario criador nao encontrado", 404);
            if(collaboratorCreated.empresaId !== companyId) throw new CustomError("Usuario criador não pertence a esta empresa", 401);
            
            const userTypePermissions = await this.userTypePermissionsData.findByTypeUser(collaboratorCreated?.tipoId)
            const isAuthorizedForType = userTypePermissions?.some(userTypePermission =>  userTypePermission.permissaoId === 7)

            if(!isAuthorizedForType) throw new CustomError("Seu perfil não esta autorizado a usar essa funcinalidade", 401);
           
            let user = await this.userData.findByCpf(dataUser.cpf, true);
            console.log(user?.deletedAt)
            if(!user){
                user = await this.userData.insertUser(dataUser);
            } else if(user.deletedAt){
                const userUpdate = {
                    id: user.id,
                    nome: user.nome,
                    cpf: user.cpf,
                    celular: user.celular,
                    deletedAt: null
                }
                await this.userData.updateUser(userUpdate);
            }

            const userType = await this.userTypeData.findById(typeId);

            if(!userType) throw new CustomError("Typo de usuario nao encontrado",404);
            if(userType.empresaId !== companyId) throw new CustomError("Typo nao pertence a essa empresas",422);

            const collaborator = await this.collaboratorData.findByUserIdAndCompanyId(user?.id as string,companyId)
            if(collaborator) throw new  CustomError("Colaborador ja existente", 409);	

            await this.collaboratorData.insertCollaborator(user?.id as string, companyId, typeId);
        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode);
        }
    }

    login = async (data: TLoginData) => {
        try {
            const { cpf, password } = data;
            if (!cpf || !password) {
              throw new CustomError("Campos inválidos", 422);
            }
      
            const user = await this.userData.findByCpf(cpf,false);
            if (!user) {
              throw new CustomError("Usuário não encontrado", 404);
            }
            
            const passwordIsCorrect = await this.securePassword.compare(
                password,
                user.senha
            );

            if (!passwordIsCorrect) {
                throw new CustomError("Senha incorreta", 401);
            }

            const token = this.authenticator.generateToken({id: user.id});
            
            return token;
        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode);
        }
    }
}
