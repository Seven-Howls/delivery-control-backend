import { Request, Response } from "express";
import { DeliveriesBusiness } from "../business/DeliveriesBusiness";
import { CustomError } from "../utils/CustomError";

export class DeliveriesController{
    private deliveriesBusiness: DeliveriesBusiness;

    constructor(deliveriesBusiness: DeliveriesBusiness){
        this.deliveriesBusiness = deliveriesBusiness;
    }

    getDeliveriessInProgressByMotoBoy= async( req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string;
            const motoboyId = req.params.motoboyId;
            const deliveries = await this.deliveriesBusiness.getDeliveriesInProgressByMotoBoy(token,motoboyId);
            
            res.status(200).json(deliveries).send();
        }catch(error: CustomError | any){
            res.status(error.statusCode || 400).send({error: error.message})
        }
    }
    getHistoryDeliveriesByMotoboy = async (req: Request, res: Response):Promise<void> => {
        try {
            const token = req.headers.authorization as string;
            const motoboyId = req.params.motoboyId;
            const deliveries = await this.deliveriesBusiness.getHistoryDeliveriesByMotoboy(token,motoboyId);
            
            res.status(200).json(deliveries).send();
        } catch (error: any) {
            res.status(error.statusCode || 400).send({error: error.message}) 
        }
    }
    updateDeliveryStatusById = async (req: Request, res: Response):Promise<void> => {
        try {
            const token = req.headers.authorization as string;
            const {motoboyId, statusId} = req.body;
            const deliveryId = req.params.id
            const response = await this.deliveriesBusiness.updateDeliveryStatusById(token,deliveryId,motoboyId,statusId);
            
            res.status(200).send({message: response});
        } catch (error: any) {
            res.status(error.statusCode || 400).send({error: error.message}) 
        }
    }
}