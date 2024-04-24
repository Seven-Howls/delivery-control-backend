import { Request, Response } from "express";
import { MotoboyBusiness } from "../business/MotoboyBusiness";
import { CustomError } from "../utils/CustomError";

export class MotoboyController{
    private motoboyBusiness: MotoboyBusiness;

    constructor(motoboyBusiness: MotoboyBusiness){
        this.motoboyBusiness = motoboyBusiness;
    }
    getMotoboyByUserId= async( req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string;
            const userId = req.query.userId;
            const motoboy = await this.motoboyBusiness.getMotoboyByUserId(token,userId as string);
            res.status(200).json(motoboy).send();
        }catch(error: CustomError | any){
            res.status(error.statusCode || 400).send({error: error.message})
        }
    }
}