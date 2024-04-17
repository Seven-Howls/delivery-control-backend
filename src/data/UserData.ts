import { Usuario } from "../definitions/Usuario";
import { IUserData } from "../models/InterfaceUserData";
import { IUsuario } from "../models/interfaceUsuario";

export class UserData implements IUserData{
    private user :  typeof Usuario;

    constructor(){
        this.user = Usuario;
    }
    async findByCpf(cpf: string): Promise<IUsuario | null> {
        try {
            const usuario = this.user.findOne({
                where:{ cpf }
            })

            return usuario;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}