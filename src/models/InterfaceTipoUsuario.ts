import { Model } from "sequelize";

interface ITipoUsuario {
    id: string,
    empresaId: string,
    nome: string,
    nivel: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface TipoUsuarioInstance extends Model<ITipoUsuario>, ITipoUsuario { }

export {
    ITipoUsuario,
    TipoUsuarioInstance
}
