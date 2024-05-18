import { Op } from "sequelize";
import { DeliveryFee } from "../Definitions/DeliveryFee";
import { IDeliveryFee, IDeliveryFeeData } from "../models/InterfaceDeliveryFee";

export class DeliveryFeeData implements IDeliveryFeeData {
    private deliveriesFee: typeof DeliveryFee

    constructor(){
        this.deliveriesFee = DeliveryFee
    }
    findById =  async (id: string): Promise<IDeliveryFee | null> => {
        try{
            const deliveriesFee = await this.deliveriesFee.findOne({
                where: {
                    id,
                    deletedAt: {
                        [Op.is]: null
                    }
                }
            })
            return deliveriesFee
        } catch (error: any){
            throw new Error(error.message)
        }
    }
    findByIdAndCompany =  async (id: string, empresaId: string): Promise<IDeliveryFee | null> => {
        try{
            const deliveriesFee = await this.deliveriesFee.findOne({
                where: {
                    id,
                    empresaId,
                    deletedAt: {
                        [Op.is]: null
                    }
                }
            })
            return deliveriesFee
        } catch (error: any){
            throw new Error(error.message)
        }
    }
}
