import { THistoryDeliveries } from "../types/THistoryDeliveries"
import { IDeliveries } from "./InterfaceDeliveries"

export interface IDeliveriesData{
    findStatusInProgressByMotoboy(motoboyId: string): Promise<IDeliveries[] | null>
    findHistoryByMotoboy(motoboyId:string): Promise<THistoryDeliveries[] | null | undefined>
    updateStatusDelivery(deliveryId: string, statusId:string): Promise< void >
}