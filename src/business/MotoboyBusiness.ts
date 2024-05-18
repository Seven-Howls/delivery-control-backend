import { ICollaboratorData } from "../models/InterfaceCollaborator";
import { ICompanyData } from "../models/InterfaceCompany";
import { IMotoboyData } from "../models/InterfaceMotoboy";
import { IUserData } from "../models/interfaceUser";
import { IUserTypePermissionsData } from "../models/InterfaceUserTypePermissions";
import { Authenticator } from "../services/Authenticator";
import { SecurePasswordHandler } from "../services/SecurePasswordHandler";
import { TCreateUserData } from "../types/TCreateUserData";
import { CustomError } from "../utils/CustomError";
import { TMotoboyOfCompany } from "../types/TMotoboyOfCompany";

export class MotoboyBusiness {
    private motoboyData: IMotoboyData;
    private userData: IUserData;
    private companyData: ICompanyData;
    private collaboratorData: ICollaboratorData;
    private userTypePermissionsData: IUserTypePermissionsData;
    private authenticator: Authenticator;
    private securePassword: SecurePasswordHandler; 

    constructor(
        motoboyData: IMotoboyData, 
        userData: IUserData,
        companyData: ICompanyData,
        collaboratorData: ICollaboratorData,
        userTypePermissionsData: IUserTypePermissionsData
    ) {
        this.motoboyData = motoboyData;
        this.userData = userData;
        this.companyData = companyData;
        this.collaboratorData = collaboratorData;
        this.userTypePermissionsData = userTypePermissionsData
        this.authenticator = new Authenticator();
        this.securePassword = new SecurePasswordHandler();
    }

    getMotoboyByUserId = async(token:string, usuarioId:string) => {
        try{
            if(!usuarioId) throw new CustomError("usuarioId ausente ou nulo na Path Variables ", 422);
            const user = await this.userData.findById(usuarioId);
            if(!user) throw new CustomError("Usuario não encontrado", 404);

            const motoboy = await this.motoboyData.findMotoboyByUserId(usuarioId);
            if(!motoboy) throw new CustomError("Motoboy não encontrado", 404);
            
            return motoboy
        }catch(error: any){
            throw new CustomError(error.message, error.statusCode);
        }
    }

    signup = async (token: string, companyId: string, dataUser: TCreateUserData): Promise<void> => {
        try {
            if(!dataUser.celular || !dataUser.cpf || !dataUser.nome || !dataUser.password || !dataUser.email) throw new CustomError("Parametros obrigatorios do usuario não enviados", 422);

            if(!token) throw new CustomError("Token ausente na autenticação",422);
            const isAuthorized = this.authenticator.getTokenData(token);
            if(!isAuthorized) throw new CustomError("Não autorizado", 401);

            if(!companyId) throw new CustomError("companyId não enviado", 422);
            const company = await this.companyData.findById(companyId);
            if(!company) throw new CustomError("Empresa não encontrada", 404); 

            const collaboratorCreated = await this.collaboratorData.findById(isAuthorized.id);
            if(!collaboratorCreated) throw new CustomError("Usuario criador nao encontrado", 404);
            if(collaboratorCreated.empresaId !== companyId) throw new CustomError("Usuario criador não pertence a esta empresa", 401);

            const userTypePermissions = await this.userTypePermissionsData.findByTypeUser(collaboratorCreated?.tipoId)
            const isAuthorizedForType = userTypePermissions?.some(userTypePermission =>  userTypePermission.permissaoId === '3')
            if(!isAuthorizedForType) throw new CustomError("Seu perfil não esta autorizado a usar essa funcinalidade", 401);

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

            const motoboy = await this.motoboyData.findByUserIdAndCompany(user?.id as string, companyId)
            if(motoboy) throw new  CustomError("Motoboy ja existente", 409);
            
            await this.motoboyData.insert(user?.id as string, companyId);
        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode);
        }
    }

    login = async (cpf:string, password:string): Promise<TMotoboyOfCompany[] | null > => {
        try {
            if(!cpf || !password ) throw new CustomError(`Parametros obrigatorios do usuario não enviados`,422)

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

            const motoboys = await this.motoboyData.findMotoboyByUserId(user.id);
            let motoboysJSON = motoboys.map(motoboy => motoboy.toJSON());
            motoboysJSON = motoboysJSON.find(element => {
                const payload = {
                    id: element.id,
                    companyId: element.empresaId
                }
                element.token = this.authenticator.generateToken(payload);
                return element
            })

            return motoboysJSON
        } catch (error:any) {
            throw new CustomError(error.message, error.statusCode);
        }
    }
}
