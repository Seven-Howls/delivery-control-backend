import { Request, Response } from "express";
import { PaymentMethodBusiness } from "../business/PaymentMethodBusiness"
import { CustomError } from "../utils/CustomError";

export class PaymentMethodController{
    private paymentMethodBusiness: PaymentMethodBusiness;

    constructor(paymentMethodBusiness: PaymentMethodBusiness){
        this.paymentMethodBusiness = paymentMethodBusiness;
    }
    getPayment = async( req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string;
            const paymentMethod = await this.paymentMethodBusiness.getPaymentMethod(token);
            res.status(200).json(paymentMethod).send();
        }catch(error: CustomError | any){
            res.status(error.statusCode || 400).send({error: error.message})
        }
    }
}