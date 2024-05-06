import { ICollaboratorData } from "../models/InterfaceCollaborator";
import { IDeliveries, IDeliveriesData,  } from "../models/InterfaceDeliveries";
import { IDeliveryFee, IDeliveryFeeData } from "../models/InterfaceDeliveryFee";
import { IMotoboyData } from "../models/InterfaceMotoboy";
import { IPaymentMethodData } from "../models/InterfacePaymentMethod";
import { IStatusData } from "../models/InterfaceStatus";
import { Authenticator } from "../services/Authenticator";
import { CustomError } from "../utils/CustomError";

export class DeliveriesBusiness {
    private deliveriesData: IDeliveriesData;
    private motoboyData: IMotoboyData;
    private statusData : IStatusData
    private authenticator: Authenticator;
    private deliveryFeeData: IDeliveryFeeData;
    private paymentMethodData: IPaymentMethodData;
    private collaboratorData: ICollaboratorData;

    constructor(
        deliveriesData: IDeliveriesData,
        motoboyData: IMotoboyData, 
        statusData: IStatusData, 
        deliveryFeeData: IDeliveryFeeData, 
        paymentMethodData: IPaymentMethodData,
        collaboratorData: ICollaboratorData
    ) {
        this.deliveriesData = deliveriesData;
        this.motoboyData = motoboyData;
        this.statusData = statusData;
        this.deliveryFeeData = deliveryFeeData;
        this.paymentMethodData = paymentMethodData;
        this.collaboratorData = collaboratorData;
        this.authenticator = new Authenticator();
    }

    getDeliveriesInProgressByMotoBoy = async (token: string, motoboyId:string) => {
        try{
            //if(!token) throw new CustomError("Token ausente na autenticação",422);
            if(!motoboyId) throw new CustomError("motoboyId ausente ou nulo na Path Variables ", 422);

            //const isAuthorized = this.authenticator.getTokenData(token);
            //if(!isAuthorized) throw new CustomError("Não autorizado", 401);

            const motoboy = await this.motoboyData.findById(motoboyId);
            if(!motoboy) throw new CustomError("Motoboy não encontrado", 404);

            const deliveries = await this.deliveriesData.findStatusInProgressByMotoboy(motoboyId);
            
            return deliveries
        }catch(error: any){
            throw new CustomError(error.message, error.statusCode);
        }
    }

    getHistoryDeliveriesByMotoboy = async (token: string, motoboyId:string) => {
        try{
            //if(!token) throw new CustomError("Token ausente na autenticação",422);
            if(!motoboyId) throw new CustomError("motoboyId ausente ou nulo na Path Variables ", 422);

            //const isAuthorized = this.authenticator.getTokenData(token);
            //if(!isAuthorized) throw new CustomError("Não autorizado", 401);

            const motoboy = await this.motoboyData.findById(motoboyId);
            if(!motoboy) throw new CustomError("Motoboy não encontrado", 404);

            const deliveries = await this.deliveriesData.findHistoryByMotoboy(motoboyId);
            
            return deliveries
        }catch(error: any){
            throw new CustomError(error.message, error.statusCode);
        }
    }
    updateDeliveryStatusById = async (token: string, deliveryId:string, motoboyId: string, statusId: string)  => {
        try{
            //if(!token) throw new CustomError("Token ausente na autenticação",422);
            if(!motoboyId || !statusId) throw new CustomError("motoboyId ou statusId estão nulos no body", 422);
            if(!deliveryId) throw new CustomError("deliveryId ausente ou nulo na Path Variables ", 422);
            //const isAuthorized = this.authenticator.getTokenData(token);
            //if(!isAuthorized) throw new CustomError("Não autorizado", 401);
            const status = await this.statusData.getStatusById(statusId);
            if(!status) throw new CustomError("Status não encontrado", 404);

            const motoboy = await this.motoboyData.findById(motoboyId);
            if(!motoboy) throw new CustomError("Motoboy não encontrado", 404);

            const delivery = await this.deliveriesData.getDeliveryByIdAndMotoboy(deliveryId, motoboyId);
            if(!delivery) throw new CustomError("Entrega não encontrada", 404);

            await this.deliveriesData.updateStatusDeliveryById(deliveryId, statusId);

            return "Entrega atualizada com sucesso"
        }catch(error: any){
            throw new CustomError(error.message, error.statusCode);
        }
    }

    createDelivery = async (token: string, delivery: IDeliveries) => {
        try{
            //if(!token) throw new CustomError("Token ausente na autenticação",422);
            if(!delivery) throw new CustomError("Entrega ausente ou nula no body", 422);
            const isAuthorized = this.authenticator.getTokenData(token);
            if(!isAuthorized) throw new CustomError("Não autorizado", 401);
            
            const collaborator = await this.collaboratorData.findById(isAuthorized.id);
            if(!collaborator) throw new CustomError("Usuario criador nao encontrado", 404);
            if(collaborator.empresaId !== delivery.companyId) throw new CustomError("Usuario criador não pertence a esta empresa", 401);
            
            const userTypePermissions = await this.userTypePermissionsData.findByTypeUser(collaboratorCreated?.tipoId)
            const isAuthorizedForType = userTypePermissions?.some(userTypePermission =>  userTypePermission.permissaoId === 7)

            if(!isAuthorizedForType) throw new CustomError("Seu perfil não esta autorizado a usar essa funcinalidade", 401);

            const motoboy = await this.motoboyData.findById(delivery.motoboyId);   
            if(!motoboy) throw new CustomError("Motoboy não encontrado", 404);
            const status = await this.statusData.getStatusById(delivery.statusId);
            if(!status) throw new CustomError("Status não encontrado", 404);
            const deliveryFee = await this.deliveryFeeData.findById(delivery.taxaEntregaId); 
            if(!deliveryFee) throw new CustomError("Taxa de entrega não encontrada", 404);
            const paymentMethod = await this.paymentMethodData.findById(delivery.metodoPagamentoId);
            if(!paymentMethod) throw new CustomError("Metodo de pagamento não encontrado", 404);


        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode);
        }
    }
}