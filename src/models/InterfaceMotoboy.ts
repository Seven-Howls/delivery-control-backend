import { Model } from "sequelize";
import { TPersonalDataOfMotoboy } from "../types/TPersonalDataOfMotoboy";
import { TMotoboyOfCompany } from "../types/TMotoboyOfCompany";

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
    findMotoboyByUserId(usuarioId: string): Promise<TMotoboyOfCompany[]>
    findByUserIdAndCompany(usuarioId: string, empresaId: string): Promise<IMotoboy | null>
    findPersonalDataOfMotoboy(motoboyId: string): Promise< TPersonalDataOfMotoboy | null >
    findAllByCompanyId(empresaId: string): Promise< IMotoboy[] | null >
    insert(usuarioId: string, empresaId: string): Promise<void>
}

export {
    IMotoboy,
    MotoboyInstance,
    IMotoboyData
}
