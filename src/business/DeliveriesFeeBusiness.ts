import { userRouter } from './../router/userRouter';
import { UserTypePermissionsData } from './../data/UserTypePermissionsData';
import { CompanyData } from './../data/CompanyData';
import { IDeliveryFeeData } from "../models/InterfaceDeliveryFee";
import { Authenticator } from "../services/Authenticator";
import { TCreateDeliveryFee } from "../types/TCreateDeliveryFee";
import { CustomError } from "../utils/CustomError";
import { isNullOrUndefinedOrEmpty } from "../utils/isNullOrUndefinedOrEmpty";

export class DeliveriesFeeBusiness {
    private deliveriesFeeData: IDeliveryFeeData;
    private companyData: CompanyData;
    private userTypePermissionsData: UserTypePermissionsData;
    private authenticator: Authenticator;

    constructor(
        deliveiresFeeData: IDeliveryFeeData,
        companyData: CompanyData,
        userTypePermissionsData: UserTypePermissionsData
    ) {
        this.deliveriesFeeData = deliveiresFeeData;
        this.companyData = companyData;
        this.userTypePermissionsData = userTypePermissionsData;
        this.authenticator = new Authenticator();
    }

    getDeliveryFeeById = async (id: string, token: string) => {
        try {
            if (!token) throw new CustomError("Token ausente", 422)
            const isAuthorized = this.authenticator.getTokenData(token);
            if (!isAuthorized) throw new CustomError("Não autorizado", 401);

            const deliveryFee = await this.deliveriesFeeData.findById(id);
            if (!deliveryFee)
                throw new CustomError("Taxa de Entrega não encontrada!", 404);
            return deliveryFee;
        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode);
        }
    };
    getAllDeliveriesFee = async (token: string) => {
        try {
            if (!token) throw new CustomError("Token ausente", 422)
            const isAuthorized = this.authenticator.getTokenData(token);
            if (!isAuthorized) throw new CustomError("Não autorizado", 401);

            const company = await this.companyData.findById(isAuthorized.companyId);
            if(!company) throw new CustomError("Empresa não encontrada", 404);
            
            const allDeliveriesFee = await this.deliveriesFeeData.findByCompanyId(isAuthorized.companyId);
            if (!allDeliveriesFee)
                throw new CustomError(
                    "Nenhuma Taxa de Entrega Encontrada!",
                    404
                );
            return allDeliveriesFee;
        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode);
        }
    };

    createDeliveryFee = async (descricao: string, valor: number, token: string) => {
        try {
            if (!token) throw new CustomError("Token ausente", 422)
            const isAuthorized = this.authenticator.getTokenData(token);
            if (!isAuthorized) throw new CustomError("Não autorizado", 401);

            const company = await this.companyData.findById(isAuthorized.companyId);
            if(!company) throw new CustomError("Empresa não encontrada", 404);

            if(!descricao || !valor ) throw new CustomError("Parametros obrigatorios da taxa de entrega nao enviados (descricao,valor)", 422);

            await this.deliveriesFeeData.createNewFee(descricao, valor, isAuthorized.companyId);
        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode)
        }
    }

    updateDeliveryFee = async (token: string, id: string, data: TCreateDeliveryFee) => {
        try {
            if (!token) throw new CustomError("Token ausente", 422)
            const isAuthorized = this.authenticator.getTokenData(token);
            if (!isAuthorized) throw new CustomError("Não autorizado", 401);
            if (isNullOrUndefinedOrEmpty(data)) throw new CustomError("Dados obrigatorios do usuario não enviados", 422);

            const company = await this.companyData.findById(isAuthorized.companyId);
            if (!company) throw new CustomError("Empresa não encontrada", 404);

            const userTypePermissions = await this.userTypePermissionsData.findByTypeUserAndLevel(isAuthorized.roleId as string, 10)
            if (!userTypePermissions) throw new CustomError("Seu perfil não esta autorizado a usar essa funcinalidade", 401);

            const deliveryFee = await this.deliveriesFeeData.findById(id);
            if (!deliveryFee) throw new CustomError("Taxa de entrega nao encontrado não encontrado", 404);

            const deliveryFeeUpdate = {
                id: id,
                descricao: data.description || deliveryFee.descricao,
                valor: data.value || deliveryFee.valor,
                empresaId: isAuthorized.companyId,
            }

            await this.deliveriesFeeData.updateUser(deliveryFeeUpdate);
        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode)
        }
    }

}
