import { Model } from "sequelize";
import { TPersonalDataOfMotoboy } from "../types/TPersonalDataOfMotoboy";

interface IMotoboy {
    id: string,
    empresaId: string,
    usuarioId: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface MotoboyInstance extends Model<IMotoboy>, IMotoboy { }

interface IMotoboyData {
    findById(id: string): Promise<IMotoboy | null>
    findMotoboyByUserId(usuarioId: string): Promise<any>
    findByUserIdAndCompany(usuarioId: string, empresaId: string): Promise<IMotoboy | null>
    findPersonalDataOfMotoboy(motoboyId: string): Promise< TPersonalDataOfMotoboy | null >
    insert(usuarioId: string, empresaId: string): Promise<void>
}

export {
    IMotoboy,
    MotoboyInstance,
    IMotoboyData
}
