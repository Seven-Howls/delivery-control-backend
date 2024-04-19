import { Model } from "sequelize";

interface IDeliveryFee {
    id: string,
    empresaId: string,
    descricao: string,
    valor: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface DeliveryFeeInstance extends Model<IDeliveryFee>, IDeliveryFee { }

export {
    IDeliveryFee,
    DeliveryFeeInstance
}
