import { Model } from "sequelize";
import { TDeliveryCreated } from "../types/TDeliveryCreated";
import { TUpdateDeliveryFee } from "../types/TUpdateDeliveryFee";

interface IDeliveryFee {
    id: string;
    empresa_id: string;
    descricao: string;
    valor: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

interface DeliveryFeeInstance extends Model<IDeliveryFee>, IDeliveryFee {}

interface IDeliveryFeeData {
    findById(id: string): Promise<IDeliveryFee | null>;
    findByCompanyId(empresa_id: string): Promise<IDeliveryFee | null>;
    createNewFee(
        descricao: string,
        valor: number,
        empresa_id: string
    ): Promise<void>;
    updateUser(data: TUpdateDeliveryFee): Promise<void>
    findById(id: string): Promise<IDeliveryFee | null>
    findByIdAndCompany(id: string, empresaId:string): Promise<IDeliveryFee | null>
}
export {
    IDeliveryFee,
    DeliveryFeeInstance,
    IDeliveryFeeData
}
export { IDeliveryFee, DeliveryFeeInstance, IDeliveryFeeData };
