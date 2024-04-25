
import { IPaymentMethodData } from "../models/InterfacePaymentMethod";
import { Authenticator } from "../services/Authenticator";
import { CustomError } from "../utils/CustomError";

export class PaymentMethodBusiness {
    private paymentMethodData: IPaymentMethodData;
    private authenticator: Authenticator;

    constructor(paymentMethodData: IPaymentMethodData) {
        this.paymentMethodData = paymentMethodData;
        this.authenticator = new Authenticator();
    }

    getPaymentMethod = async(token:string) => {
        try{
            const paymentMethodData = await this.paymentMethodData.findPaymentMethod();
            if(!paymentMethodData) throw new CustomError("Metodo de pagamento nao encontrado não encontrado", 404);
            return paymentMethodData
        }catch(error: any){
            throw new CustomError(error.message, error.statusCode);
        }
    }
}