import { Motoboy } from "../definitions/Motoboy";
import { IMotoboy } from "../models/InterfaceMotoboy";
import { IMotoboyData } from "../models/InterfaceMotoboyData";
import { CustomError } from "../utils/CustomError";

export class MotoboyData implements IMotoboyData{
    private motoboy: typeof Motoboy

    constructor() {
        this.motoboy = Motoboy
    }

    async findById(motoboyId: string): Promise<IMotoboy | null> {
        try{
            const motoboy = await this.motoboy.findByPk(motoboyId); 

            return motoboy
        }catch(error: any){
            throw new CustomError(error.message, 500);
        }
    }
}