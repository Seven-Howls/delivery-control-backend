import { IMotoboy } from "./InterfaceMotoboy";

export interface IMotoboyData {
    findById(motoboyId: string): Promise<IMotoboy | null>
}