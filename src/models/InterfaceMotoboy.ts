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

export {
    IMotoboy,
    MotoboyInstance
}
