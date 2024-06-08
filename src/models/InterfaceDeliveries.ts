import { Model } from "sequelize";
import { THistoryDeliveries } from "../types/THistoryDeliveries";
import { TDeliveryCreated } from "../types/TDeliveryCreated";
import { THistoryDeliveriesFull, THistoryDeliveriesFullPagination } from "../types/THistoryDeliveriesFull";
import { TDataUpdateDeliveries } from "../types/TDataUpdateDeliveries";

interface IDeliveries {
    id?: string,
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
    deletedAt?: Date | null
}

interface DeliveriesInstance extends Model<IDeliveries>, IDeliveries { }

interface IDeliveriesData{
    getDeliveryByIdAndMotoboy(id: string, motoboyId: string): Promise<IDeliveries | null>,
    findById(id: string): Promise< IDeliveries | null>,
    findStatusInProgressByMotoboy(motoboyId: string): Promise<IDeliveries[] | null>,
    findHistoryByMotoboy(motoboyId:string): Promise<THistoryDeliveries[] | null | undefined>,
    updateStatusDeliveryById(deliveryId: string, statusId:string): Promise< void >,
    insertDelivery(delivery: TDeliveryCreated): Promise<IDeliveries | null>,
    findHistoryByMotoboyFUll(motoboyId:string ): Promise<THistoryDeliveriesFull[] | null>
    findHistoryFUll(companyId:string , page:number, perPage:number): Promise<THistoryDeliveriesFullPagination | null>
    updateDataDeliveryById(data : TDataUpdateDeliveries): Promise< void |null>
}

export {
    IDeliveries,
    DeliveriesInstance,
    IDeliveriesData
}
