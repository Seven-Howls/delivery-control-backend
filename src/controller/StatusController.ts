import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";
import { StatusBusiness } from "../business/StatusBusiness";

export class StatusController {
    private statusBusiness: StatusBusiness;

    constructor(statusBusiness: StatusBusiness){
        this.statusBusiness = statusBusiness;
    }

    getAll = async( req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string;
            const status = await this.statusBusiness.getAll(token);
            res.status(200).json(status).send();
        } catch(error: any){
            res.status(error.statusCode || 400).send({error: error.message})
        }
    }
}