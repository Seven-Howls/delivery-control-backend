import { emit } from "process";
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

    signup = async (dataUser: TSignupUserData, token: string) => {
        try {
            if(!dataUser.celular || !dataUser.cpf || !dataUser.nome || !dataUser.password || !dataUser.typeId || !dataUser.email ) throw new CustomError("Parametros obrigatorios do usuario não enviados", 422);

            if(!token) throw new CustomError("Token ausente na autenticação",422);
            const isAuthorized = this.authenticator.getTokenData(token);
            if(!isAuthorized) throw new CustomError("Não autorizado", 401);

            const company = await this.companyData.findById(isAuthorized.companyId);
            if(!company) throw new CustomError("Empresa não encontrada", 404);

            const collaboratorCreated = await this.collaboratorData.findByUserIdAndCompanyId(isAuthorized.id,isAuthorized.companyId);
            if(!collaboratorCreated) throw new CustomError("Usuario criador nao encontrado", 404);
            
            const userTypePermissions = await this.userTypePermissionsData.findByTypeUserAndLevel(collaboratorCreated.tipoId,7)
            if(!userTypePermissions) throw new CustomError("Seu perfil não esta autorizado a usar essa funcinalidade", 401);
           
            let user = await this.userData.findByCpf(dataUser.cpf, true);
            if(!user){
                dataUser.password = await this.securePassword.hash(dataUser.password);
                user = await this.userData.insertUser(dataUser);
            } else if(user.deletedAt){
                const userUpdate = {
                    id: user.id,
                    nome: user.nome,
                    cpf: user.cpf,
                    celular: user.celular,
                    email: user.email,
                    deletedAt: null
                }
                await this.userData.updateUser(userUpdate);
            }

            const userType = await this.userTypeData.findById(dataUser.typeId);

            if(!userType) throw new CustomError("Typo de usuario nao encontrado",404);
            if(userType.empresaId !== isAuthorized.companyId) throw new CustomError("Typo nao pertence a essa empresas",422);

            const collaborator = await this.collaboratorData.findByUserIdAndCompanyId(user?.id as string,isAuthorized.companyId);
            if(collaborator) throw new  CustomError("Colaborador ja existente", 409);	

            await this.collaboratorData.insertCollaborator(user?.id as string, isAuthorized.companyId, dataUser.typeId);
        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode);
        }
    }

    login = async (data: TLoginData) => {
        try {
            const { cpf, password, companyId } = data;
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
            const collaborator =  await this.collaboratorData.findByUserIdAndCompanyId(user.id, companyId)

            if(!collaborator) throw new CustomError("Colaborador não encontrado", 404);

            const token = this.authenticator.generateToken({id: collaborator.usuarioId, companyId: collaborator.empresaId, roleId: collaborator.tipoId });
            
            return [token,collaborator];
        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode);
        }
    }
}
