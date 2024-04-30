import { IDeliveriesData,  } from "../models/InterfaceDeliveries";
import { IMotoboyData } from "../models/InterfaceMotoboy";
import { IStatusData } from "../models/InterfaceStatus";
import { Authenticator } from "../services/Authenticator";
import { CustomError } from "../utils/CustomError";

export class DeliveriesBusiness {
    private deliveriesData: IDeliveriesData;
    private motoboyData: IMotoboyData;
    private statusData : IStatusData
    private authenticator: Authenticator;

    constructor(deliveriesData: IDeliveriesData, motoboyData: IMotoboyData, statusData: IStatusData) {
        this.deliveriesData = deliveriesData;
        this.motoboyData = motoboyData;
        this.statusData = statusData;
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
}