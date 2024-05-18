import { Request, Response } from "express";
import { CustomError } from "../utils/CustomError";
import { TCreateUserData } from "../types/TCreateUserData";
import { UserBusiness } from "../business/UserBusiness";

export class UserController{
    private userBusiness: UserBusiness;

    constructor(userBusiness: UserBusiness){
        this.userBusiness = userBusiness;
    }
    update = async( req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string;
            const id = req.params.id;
            const data: TCreateUserData = req.body;

            await this.userBusiness.updateUser(token, id, data);

            res.status(200).send({message: 'Usuario editado com sucesso'})
        }catch(error: CustomError | any){
            res.status(error.statusCode || 400).send({error: error.message})
        }
    }
}
