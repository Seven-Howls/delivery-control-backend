import { IMotoboy } from "./InterfaceMotoboy";

export interface IMotoboyData {
    findById(motoboyId: string): Promise<IMotoboy | null>
    findMotoboyByUserId(userId: string): Promise<any>
}