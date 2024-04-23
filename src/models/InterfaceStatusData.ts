import { IStatus } from "./InterfaceStatus";

export interface IStatusData {
    getStatusById(id: string): Promise<IStatus | null>
}