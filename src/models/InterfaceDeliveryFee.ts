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

interface IDeliveryFeeData {
    findById(id: string): Promise<IDeliveryFee | null>
    findByIdAndCompany(id: string, empresaId:string): Promise<IDeliveryFee | null>
}
export {
    IDeliveryFee,
    DeliveryFeeInstance,
    IDeliveryFeeData
}
