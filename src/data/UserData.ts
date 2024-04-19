import { Usuario } from "../definitions/Usuario";
import { IUserData } from "../models/InterfaceUserData";
import { IUsuario } from "../models/interfaceUsuario";
import { Op } from "sequelize";

export class UserData implements IUserData{
    private user :  typeof Usuario;

    constructor(){
        this.user = Usuario;
    }
    async findByCpf(cpf: string): Promise<IUsuario | null> {
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