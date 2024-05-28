import { IDeliveryFeeData } from "../models/InterfaceDeliveryFee";
import { Authenticator } from "../services/Authenticator";
import { CustomError } from "../utils/CustomError";

export class DeliveriesFeeBusiness {
    private deliveriesFeeData: IDeliveryFeeData;
    private authenticator: Authenticator;

    constructor(deliveiresFeeData: IDeliveryFeeData) {
        this.deliveriesFeeData = deliveiresFeeData;
        this.authenticator = new Authenticator();
    }

    getDeliveryFeeById = async (id: string, token: string) => {
        try {
            const deliveryFee = await this.deliveriesFeeData.findById(id);
            if (!deliveryFee)
                throw new CustomError("Taxa de Entrega não encontrada!", 404);
            return deliveryFee;
        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode);
        }
    };
    getAllDeliveriesFee = async (empresa_id: string, token: string) => {
        try {
            const allDeliveriesFee =
                await this.deliveriesFeeData.findByCompanyId(empresa_id);
            if (!allDeliveriesFee)
                throw new CustomError(
                    "Nenhuma Taxa de Entrega Encontrada!",
                    404
                );
            return allDeliveriesFee;
        } catch (error: any) {
            throw new CustomError(error.message, error.statusCode);
        }
    };

    createDeliveryFee = async (descricao: string, valor: number, empresa_id: string, token: string) => {
      try {
        await this.deliveriesFeeData.createNewFee(descricao, valor, empresa_id);
      } catch(error: any) {
        throw new CustomError(error.message, error.statusCode)
      }
    }

}
