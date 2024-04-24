import { Model } from "sequelize";

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
    findById(motoboyId: string): Promise<IMotoboy | null>
    findMotoboyByUserId(userId: string): Promise<any>
}

export {
    IMotoboy,
    MotoboyInstance,
    IMotoboyData
}
