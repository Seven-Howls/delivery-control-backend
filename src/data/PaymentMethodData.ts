import { Op } from "sequelize";
import { PaymentMethod } from "../Definitions/PaymentMethod";
import { IPaymentMethod, IPaymentMethodData } from "../models/InterfacePaymentMethod";
import { CustomError } from "../utils/CustomError";

export class PaymentMethodData implements IPaymentMethodData{
    private payment: typeof PaymentMethod

    constructor() {
        this.payment = PaymentMethod
    }
    async findPaymentMethod(): Promise<IPaymentMethod | any>{
        try{
            const payment = await this.payment.findAll({
                attributes: ['id','nome'], 
                where:{
                    deletedAt: {
                        [Op.is] : null
                    } 
                }
            })
            return payment
        }catch(error: any){
            throw new CustomError(error.message, 500);
        }
    }

    findById = async (id: string): Promise<IPaymentMethod | null> => {  
        try{
            const payment = await this.payment.findOne({
                where:{
                    id,
                    deletedAt: {
                        [Op.is] : null
                    } 
                }
            })
            return payment
        }catch(error: any){
            throw new CustomError(error.message, 500);
        }
    }   
}
