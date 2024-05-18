import { Op } from "sequelize";
import { DeliveryFee } from "../Definitions/DeliveryFee";
import { IDeliveryFee, IDeliveryFeeData } from "../models/InterfaceDeliveryFee";
import { generateUuid } from "../utils/generateUuid";

export class DeliveryFeeData implements IDeliveryFeeData {
    private deliveriesFee: typeof DeliveryFee;

    constructor() {
        this.deliveriesFee = DeliveryFee;
    }
    findById = async (id: string): Promise<IDeliveryFee | null> => {
        try {
            const deliveriesFee = await this.deliveriesFee.findOne({
                where: {
                    id,
                    deletedAt: {
                        [Op.is]: null,
                    },
                },
            });
            return deliveriesFee;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    findByCompanyId = async (
        empresa_id: string
    ): Promise<IDeliveryFee | null> => {
        try {
            const deliveriesFee = await this.deliveriesFee.findOne({
                where: {
                    empresa_id,
                    deletedAt: {
                        [Op.is]: null,
                    },
                },
            });
            return deliveriesFee;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    createNewFee = async (
        descricao: string,
        valor: number,
        empresa_id: string
    ): Promise<void> => {
        try {
            const deliveriesFee = await this.deliveriesFee.create({
                    id: generateUuid(),
                    empresa_id,
                    descricao,
                    valor,
                    createdAt: new Date(),
                    updatedAt: new Date(),
            });
            await deliveriesFee.save();
        } catch (error: any) {
            throw new Error(error.message);
        }
    };
}
