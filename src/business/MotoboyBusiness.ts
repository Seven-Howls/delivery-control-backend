import { IMotoboyData } from "../models/InterfaceMotoboy";
import { Authenticator } from "../services/Authenticator";
import { CustomError } from "../utils/CustomError";

export class MotoboyBusiness {
    private motoboyData: IMotoboyData;
    private authenticator: Authenticator;

    constructor(motoboyData: IMotoboyData) {
        this.motoboyData = motoboyData;
        this.authenticator = new Authenticator();
    }

    getMotoboyByUserId = async(token:string, usuarioId:string) => {
        try{
            if(!usuarioId) throw new CustomError("usuarioId ausente ou nulo na Path Variables ", 422);
            const motoboy = await this.motoboyData.findMotoboyByUserId(usuarioId);
            if(!motoboy) throw new CustomError("Motoboy não encontrado", 404);
            return motoboy
        }catch(error: any){
            throw new CustomError(error.message, error.statusCode);
        }
    }
}