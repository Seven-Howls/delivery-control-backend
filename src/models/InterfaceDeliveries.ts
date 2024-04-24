import { Model } from "sequelize";
import { THistoryDeliveries } from "../types/THistoryDeliveries";

interface IDeliveries {
    id: string,
    taxaEntregaId: string,
    motoboyId: string,
    metodoPagamentoId: string,
    statusId: string,
    valorProduto: number,
    taxaServico: number,
    valorLiquido: number,
    comandaId: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface DeliveriesInstance extends Model<IDeliveries>, IDeliveries { }

interface IDeliveriesData{
    getDeliveryByIdAndMotoboy(id: string, motoboyId: string): Promise<IDeliveries | null>
    findStatusInProgressByMotoboy(motoboyId: string): Promise<IDeliveries[] | null>
    findHistoryByMotoboy(motoboyId:string): Promise<THistoryDeliveries[] | null | undefined>
    updateStatusDeliveryById(deliveryId: string, statusId:string): Promise< void >
}

export {
    IDeliveries,
    DeliveriesInstance,
    IDeliveriesData
}
