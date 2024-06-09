import { Model } from "sequelize";

interface IStatus {
    id: string,
    nome: string,
    nivel: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface StatusInstance extends Model<IStatus>, IStatus { }

interface IStatusData {
    getStatusById(id: string): Promise<IStatus | null>
    getAll(): Promise<IStatus[] | null>
}

export {
    IStatus,
    StatusInstance,
    IStatusData
}
