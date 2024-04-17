import { IUserData } from "../models/InterfaceUserData";
import { SecurePasswordHandler } from "../services/SecurePasswordHandler";
import { TSignupData } from "../types/SignupData";
import { TLoginData } from "../types/TLoginData";
import { CustomError } from "../utils/CustomError";

export class UserBusiness {
    private userData: IUserData;
    private securePassword: SecurePasswordHandler;

    constructor(userData: IUserData){
        this.userData = userData;
        this.securePassword = new SecurePasswordHandler();
    }

    async login(data: TLoginData) {
        try {
            const { cpf, senha } = data;
            if (!cpf || !senha) {
              throw new CustomError("Campos inválidos", 422);
            }
      
            const user = await this.userData.findByCpf(cpf);
            if (!user) {
              throw new CustomError("Usuário não encontrado", 404);
            }
            
            const passwordIsCorrect = await this.securePassword.compare(
                senha,
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