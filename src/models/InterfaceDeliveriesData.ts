import { THistoryDeliveries } from "../types/THistoryDeliveries"
import { IDeliveries } from "./InterfaceDeliveries"

export interface IDeliveriesData{
    getDeliveryByIdAndMotoboy(id: string, motoboyId: string): Promise<IDeliveries | null>
    findStatusInProgressByMotoboy(motoboyId: string): Promise<IDeliveries[] | null>
    findHistoryByMotoboy(motoboyId:string): Promise<THistoryDeliveries[] | null | undefined>
    updateStatusDeliveryById(deliveryId: string, statusId:string): Promise< void >
}