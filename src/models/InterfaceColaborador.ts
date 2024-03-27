import { Model } from "sequelize";

interface IColaborador {
    id: string,
    tipoId: string,
    empresaId: string,
    usuarioId: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface ColaboradorInstance extends Model<IColaborador>, IColaborador { }

export {
    IColaborador,
    ColaboradorInstance
}
