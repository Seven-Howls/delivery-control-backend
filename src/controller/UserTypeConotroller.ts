import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";
import { UserTypeBusiness } from "../business/UserTypeBusiness";

export class UserTypeConotroller{
    private userTypeBusiness: UserTypeBusiness;

    constructor(userTypeBusiness: UserTypeBusiness){
        this.userTypeBusiness = userTypeBusiness;
    }
    findAll = async( req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string;

            const userTypes = await this.userTypeBusiness.findAll(token);

            res.status(200).json(userTypes)
        }catch(error: CustomError | any){
            res.status(error.statusCode || 400).send({error: error.message})
        }
    }
}
