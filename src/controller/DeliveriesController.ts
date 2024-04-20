import { Request, Response } from "express";
import { DeliveriesBusiness } from "../business/DeliveriesBusiness";
import { CustomError } from "../utils/CustomError";

export class DeliveriesController{
    private deliveriesBusiness: DeliveriesBusiness;

    constructor(deliveriesBusiness: DeliveriesBusiness){
        console.log(deliveriesBusiness)
        this.deliveriesBusiness = deliveriesBusiness;
    }

    getDeliveriessInProgressByMotoBoy= async( req: Request, res: Response): Promise<void> => {
        try{
            console.log(this.deliveriesBusiness)
            const token = req.headers.authorization as string;
            const motoboyId = req.params.motoboyId;
            const deliveries = await this.deliveriesBusiness.getDeliveriessInProgressByMotoBoy(token,motoboyId);
            res.status(200).json(deliveries).send();
        }catch(error: CustomError | any){
            res.status(error.statusCode || 400).send({error: error.message})
        }
    }
}