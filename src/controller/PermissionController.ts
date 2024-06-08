import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";
import { PermissionBusiness } from "../business/PermissionsBusiness";


export class PermissionConotroller{
    private permissionBusiness: PermissionBusiness;

    constructor(permissionBusiness: PermissionBusiness ){
        this.permissionBusiness = permissionBusiness;
    }
    findAll = async( req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string;

            const permissions = await this.permissionBusiness.findAll(token);

            res.status(200).json(permissions)
        }catch(error: CustomError | any){
            res.status(error.statusCode || 400).send({error: error.message})
        }
    }
}
