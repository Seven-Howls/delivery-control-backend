import { ICollaboratorData } from "../models/InterfaceCollaborator";
import { IUserTypePermissionsData } from "../models/InterfaceUserTypePermissions";
import { IUserData } from "../models/interfaceUser";
import { Authenticator } from "../services/Authenticator";
import { SecurePasswordHandler } from "../services/SecurePasswordHandler";
import { TLoginData } from "../types/TLoginData";
import { TSignupUserData } from "../types/TSignupUserData";
import { CustomError } from "../utils/CustomError";

export class UserBusiness {
    private userData: IUserData;
    private collaboratorData: ICollaboratorData;
    private userTypePermissionsData: IUserTypePermissionsData;
    private securePassword: SecurePasswordHandler;
    private authenticator: Authenticator;

    constructor(userData: IUserData, collaboratorData: ICollaboratorData, userTypePermissionsData: IUserTypePermissionsData) {
        this.userData = userData;
        this.collaboratorData = collaboratorData;
        this.userTypePermissionsData = userTypePermissionsData;
        this.securePassword = new SecurePasswordHandler();
        this.authenticator = new Authenticator();
    }

    signupCollaborator = async (dataUser: TSignupUserData, companyId: string, typeId: string, token: string) => {
        try {
            if(!dataUser) throw new CustomError("Parametros obrigatorios do usuario não enviados", 422);
            //TODO : Verificar ser os dados de usuario estao corretos
            if(!companyId) throw new CustomError("companyId não enviado", 422);
            if(!typeId) throw new CustomError("typeId não enviado", 422);
            //if(!token) throw new CustomError("Token ausente na autenticação",422);
            const isAuthorized = this.authenticator.getTokenData(token);
            if(!isAuthorized) throw new CustomError("Não autorizado", 401);
            //TODO : Verificar se o usuario tem permissao para criar usuario
            const collaboratorCreated = await this.collaboratorData.findById(isAuthorized.id);
            if(!collaboratorCreated) throw new CustomError("Usuario criador nao encontrado", 404);
            if(collaboratorCreated.empresaId !== companyId) throw new CustomError("Usuario criador não pertence a esta empresa", 401);
            //TODO : Verificar se o perfil esta autorizado a usar essa funcionalidade
            const userTypePermissions = await this.userTypePermissionsData.findByTypeUser(collaboratorCreated?.tipoId)
            const isAuthorizedForType = userTypePermissions?.some(userTypePermission =>  userTypePermission.permissaoId === 7)
            if(!isAuthorizedForType) throw new CustomError("Seu perfil não esta autorizado a usar essa funcinalidade", 401);
            //TODO : Verificar se usuario a ser criado ja existe
            //TODO : Verificar se a Empresa existe
            //TODO : Verificar se tipo do usuario exite e se pertence a empresa enviada
            //TODO : Criar o usuario caso nao exista
            //TODO : Criar o registro do usuario na tabela colaborador, criar a senha baseada no cpf ? para primeiro acesso
            //TODO : retonar mensagem que o colaborador foi criado( Dizer que a senha e o cpf do colaborador ?)

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
      
            const user = await this.userData.findByCpf(cpf);
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
