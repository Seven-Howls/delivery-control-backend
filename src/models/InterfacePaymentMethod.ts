import { Model } from "sequelize";

interface IPaymentMethod {
    id: string,
    nome: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface PaymentMethodInstance extends Model<IPaymentMethod>, IPaymentMethod { }

interface IPaymentMethodData {
    findPaymentMethod(): Promise<IPaymentMethod | any>
}

export {
    IPaymentMethod,
    IPaymentMethodData,
    PaymentMethodInstance
}
