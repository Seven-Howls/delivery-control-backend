import { User } from "../definitions/index";
import { IUserData } from "../models/InterfaceUserData";
import { IUser } from "../models/interfaceUser";
import { Op } from "sequelize";

export class UserData implements IUserData{
    private user :  typeof User;

    constructor(){
        this.user = User;
    }
    async findByCpf(cpf: string): Promise<IUser | null> {
        try {
            const usuario = this.user.findOne({
                attributes: ['id','senha'],
                where:{ 
                    cpf,
                    deletedAt:{
                        [Op.is]: null
                    }
                }
            })
            return usuario;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}