import { User } from "../Definitions/index";
import { IUser, IUserData } from "../models/interfaceUser";
import { Op } from "sequelize";

export class UserData implements IUserData{
    private user: typeof User

    constructor(){
        this.user = User;
    }
    findByCpf=  async (cpf: string): Promise<IUser | null> => {
        try {
            const user = this.user.findOne({
                attributes: ['id','senha'],
                where:{ 
                    cpf,
                    deletedAt:{
                        [Op.is]: null
                    }
                }
            });

            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    findById = async (id: string): Promise<IUser | null > => {
        try {
            const user = this.user.findOne({
                attributes: ['id','nome'],
                where: {
                    id,
                    deletedAt: {
                        [Op.is]: null
                    }
                }
            });

            return user;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}