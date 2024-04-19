import { IDeliveries } from "./InterfaceDeliveries"

export interface IDeliveriesData{
    findInProgressDeliveriesByMotoboy(motoboyId: string,companyId: string): Promise<IDeliveries[] | null>
}