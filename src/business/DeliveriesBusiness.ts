import { IDeliveriesData } from "../models/InterfaceDeliveriesData";
import { IMotoboyData } from "../models/InterfaceMotoboyData";
import { Authenticator } from "../services/Authenticator";
import { CustomError } from "../utils/CustomError";

export class DeliveriesBusiness {
    private deliveriesData: IDeliveriesData;
    private motoboyData: IMotoboyData;
    private authenticator: Authenticator;

    constructor(deliveriesData: IDeliveriesData, motoboyData: IMotoboyData) {
        this.deliveriesData = deliveriesData;
        this.motoboyData = motoboyData;
        this.authenticator = new Authenticator();
    }

    async getDeliveriessInProgressByMotoBoy(token: string, motoboyId:string){
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
}