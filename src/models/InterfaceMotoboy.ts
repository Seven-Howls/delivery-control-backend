import { Model } from "sequelize";

interface IMotoboy {
    id: string,
    nome: string,
    cpf: string,
    senha: string,
    celular: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface MotoboyInstance extends Model<IMotoboy>, IMotoboy { }

export {
    IMotoboy,
    MotoboyInstance
}
