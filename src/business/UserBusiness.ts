import { IUserData } from "../models/interfaceUser";
import { SecurePasswordHandler } from "../services/SecurePasswordHandler";
import { TLoginData } from "../types/TLoginData";
import { TSignupUserData } from "../types/TSignupUserData";
import { CustomError } from "../utils/CustomError";

export class UserBusiness {
    private userData: IUserData;
    private securePassword: SecurePasswordHandler;

    constructor(userData: IUserData){
        this.userData = userData;
        this.securePassword = new SecurePasswordHandler();
    }

    signupCollaborator = async (dataUser: TSignupUserData, companyId: string, typeId: string, token: string) => {
        try {
            if(!dataUser) throw new CustomError("Parametros obrigatorios do usuario não enviados", 422);
            //TODO : Verificar ser os dados de usuario estao corretos
            if(!companyId) throw new CustomError("companyId não enviado", 422);
            if(!typeId) throw new CustomError("typeId não enviado", 422);
            //if(!token) throw new CustomError("Token ausente na autenticação",422);
            //const isAuthorized = this.authenticator.getTokenData(token);
            //if(!isAuthorized) throw new CustomError("Não autorizado", 401);
            //TODO : Verificar se o usuario tem permissao para criar usuario
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
        
            return user;
        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode);
        }
    }
}
