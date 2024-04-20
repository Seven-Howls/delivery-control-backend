import { IDeliveries } from "./InterfaceDeliveries"

export interface IDeliveriesData{
    findStatusInProgressByMotoboy(motoboyId: string): Promise<IDeliveries[] | null>
}