import { ICollaboratorData } from "../models/InterfaceCollaborator";
import { IDeliveries, IDeliveriesData,  } from "../models/InterfaceDeliveries";
import { IDeliveryFee, IDeliveryFeeData } from "../models/InterfaceDeliveryFee";
import { IMotoboyData } from "../models/InterfaceMotoboy";
import { IPaymentMethodData } from "../models/InterfacePaymentMethod";
import { IStatusData } from "../models/InterfaceStatus";
import { IUserTypePermissionsData } from "../models/InterfaceUserTypePermissions";
import { Authenticator } from "../services/Authenticator";
import { TDeliveryCreated } from "../types/TDeliveryCreated";
import { TDataUpdateDeliveries } from "../types/TDataUpdateDeliveries";
import { CustomError } from "../utils/CustomError";

export class DeliveriesBusiness {
    private deliveriesData: IDeliveriesData;
    private motoboyData: IMotoboyData;
    private statusData : IStatusData
    private authenticator: Authenticator;
    private deliveryFeeData: IDeliveryFeeData;
    private paymentMethodData: IPaymentMethodData;
    private collaboratorData: ICollaboratorData;
    private userTypePermissionsData: IUserTypePermissionsData

    constructor(
        deliveriesData: IDeliveriesData,
        motoboyData: IMotoboyData, 
        statusData: IStatusData, 
        deliveryFeeData: IDeliveryFeeData, 
        paymentMethodData: IPaymentMethodData,
        userTypePermissionsData: IUserTypePermissionsData,
        collaboratorData: ICollaboratorData
    ) {
        this.deliveriesData = deliveriesData;
        this.motoboyData = motoboyData;
        this.statusData = statusData;
        this.deliveryFeeData = deliveryFeeData;
        this.paymentMethodData = paymentMethodData;
        this.collaboratorData = collaboratorData;
        this.userTypePermissionsData = userTypePermissionsData
        this.authenticator = new Authenticator();
    }

    getDeliveriesInProgressByMotoBoy = async (token: string, motoboyId:string) => {
        try{
            if(!token) throw new CustomError("Token ausente na autenticação",422);
            if(!motoboyId) throw new CustomError("motoboyId ausente ou nulo na Path Variables ", 422);

            const isAuthorized = this.authenticator.getTokenData(token);
            if(!isAuthorized) throw new CustomError("Não autorizado", 401);

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
            if(!token) throw new CustomError("Token ausente na autenticação",422);
            if(!motoboyId) throw new CustomError("motoboyId ausente ou nulo na Path Variables ", 422);

            const isAuthorized = this.authenticator.getTokenData(token);
            if(!isAuthorized) throw new CustomError("Não autorizado", 401);

            const motoboy = await this.motoboyData.findById(motoboyId);
            if(!motoboy) throw new CustomError("Motoboy não encontrado", 404);

            const deliveries = await this.deliveriesData.findHistoryByMotoboy(motoboyId);
            
            return deliveries
        }catch(error: any){
            throw new CustomError(error.message, error.statusCode);
        }
    }

    getHistoryDeliveriesByMotoboyFull = async (token:string, motoboyId:string) => {
        try {
            if(!token) throw new CustomError("Token ausente na autenticação",422);
            if(!motoboyId) throw new CustomError("motoboyId ausente ou nulo na Path Variables ", 422);

            const isAuthorized = this.authenticator.getTokenData(token);
            if(!isAuthorized) throw new CustomError("Não autorizado", 401);

            const motoboy = await this.motoboyData.findById(motoboyId);
            if(!motoboy) throw new CustomError("Motoboy não encontrado", 404);
            const deliveries = await this.deliveriesData.findHistoryByMotoboyFUll(motoboyId)

            return deliveries

        }catch(err: any) {
            throw new CustomError(err.message, err.statusCode)
        }
    }

    getHistoryDeliveriesFull = async (token:string, page:number, perPage:number) => {
        try {
            if(!token) throw new CustomError("Token ausente na autenticação",422);

            const isAuthorized = this.authenticator.getTokenData(token);
            if(!isAuthorized) throw new CustomError("Não autorizado", 401);

            const deliveries = await this.deliveriesData.findHistoryFUll(isAuthorized.companyId , page, perPage)

            return deliveries

        }catch(err: any) {
            throw new CustomError(err.message, err.statusCode)
        }
    }

    updateDeliveryStatusById = async (token: string, deliveryId:string, motoboyId: string, statusId: string)  => {
        try{
            if(!token) throw new CustomError("Token ausente na autenticação",422);
            if(!motoboyId || !statusId) throw new CustomError("motoboyId ou statusId estão nulos no body", 422);
            if(!deliveryId) throw new CustomError("deliveryId ausente ou nulo na Path Variables ", 422);
            const isAuthorized = this.authenticator.getTokenData(token);
            if(!isAuthorized) throw new CustomError("Não autorizado", 401);
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

    createDelivery = async (token: string, delivery: TDeliveryCreated) => {
        try{
            if(!token) throw new CustomError("Token ausente na autenticação",422);
            console.log(delivery)
            if(!delivery) throw new CustomError("Entrega ausente ou nula no body", 422);
            const isAuthorized = this.authenticator.getTokenData(token);
            if(!isAuthorized) throw new CustomError("Não autorizado", 401);
            
            const collaborator = await this.collaboratorData.findById(isAuthorized.id);
            if(!collaborator) throw new CustomError("Usuario nao encontrado", 404);
            if(collaborator.empresaId !== isAuthorized.companyId) throw new CustomError("Usuario não pertence a esta empresa", 401);
            
            const userTypePermissions = await this.userTypePermissionsData.findByTypeUser(collaborator?.tipoId)
            const isAuthorizedForType = userTypePermissions?.some(userTypePermission =>  userTypePermission.permissaoId == '1')
            if(!isAuthorizedForType) throw new CustomError("Seu perfil não esta autorizado a usar essa funcinalidade", 401);

            const motoboy = await this.motoboyData.findById(delivery.motoboyId);   
            if(!motoboy) throw new CustomError("Motoboy não encontrado", 404);

            const status = await this.statusData.getStatusById(delivery.statusId);
            if(!status) throw new CustomError("Status não encontrado", 404);
            
            const deliveryFee = await this.deliveryFeeData.findById(delivery.deliveryFeeId); 
            if(!deliveryFee) throw new CustomError("Taxa de entrega não encontrada", 404);

            const paymentMethod = await this.paymentMethodData.findById(delivery.paymentMethodId);
            if(!paymentMethod) throw new CustomError("Metodo de pagamento não encontrado", 404);

            delivery.equityValue = delivery.productValue + delivery.serviceFee + deliveryFee.valor;
            console.log(delivery)
            const deliveryCreated = await this.deliveriesData.insertDelivery(delivery); 

            return deliveryCreated;
        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode);
        }
    }
    updateDataDeliveryById = async (token: string, data: TDataUpdateDeliveries)  => {
        try{
            if(!token) throw new CustomError("Token ausente na autenticação",422);
            const isAuthorized = this.authenticator.getTokenData(token);
            if(!isAuthorized) throw new CustomError("Não autorizado", 401);
            const delivery = await this.deliveriesData.findById(data.id as string);
            if(!delivery) throw new CustomError("Entrega não encontrada", 404);
            const deliveryUpdate = {
                id: data.id,
                deliveryFeeId: data.deliveryFeeId || delivery.taxaEntregaId,
                motoboyId: data.motoboyId || delivery.motoboyId,
                methodPaymentId: data.methodPaymentId || delivery.metodoPagamentoId,
                statusId: data.statusId || delivery.statusId,
                equityValue: data.productValue || delivery.valorLiquido,
                comandId: data.comandId || delivery.comandaId,
                serviceFee: data.serviceFee || delivery.taxaServico,
                productValue: 0
            }
            const motoboy = await this.motoboyData.findById(deliveryUpdate.motoboyId);   
            if(!motoboy) throw new CustomError("Motoboy não encontrado", 404);

            const status = await this.statusData.getStatusById(deliveryUpdate.statusId);
            if(!status) throw new CustomError("Status não encontrado", 404);
            
            const deliveryFee = await this.deliveryFeeData.findByIdAndCompany(deliveryUpdate.deliveryFeeId, isAuthorized.companyId); 
            if(!deliveryFee) throw new CustomError("Taxa de entrega não encontrada", 404);

            const paymentMethod = await this.paymentMethodData.findById(deliveryUpdate.methodPaymentId);
            if(!paymentMethod) throw new CustomError("Metodo de pagamento não encontrado", 404);

            deliveryUpdate.productValue = deliveryUpdate.equityValue + deliveryUpdate.serviceFee + deliveryFee.valor;

            await this.deliveriesData.updateDataDeliveryById(deliveryUpdate);
            return "Entrega atualizada com sucesso"
        }catch(error: any){
            throw new CustomError(error.message, error.statusCode);
        }
    }
}