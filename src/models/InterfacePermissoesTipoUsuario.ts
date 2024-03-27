import { Model } from "sequelize";

interface IPermissoesTipoUsuario {
    id: string,
    permissaoId: string,
    tipoUsuarioId: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface PermissoesTipoUsuarioInstance extends Model<IPermissoesTipoUsuario>, IPermissoesTipoUsuario { }

export {
    IPermissoesTipoUsuario,
    PermissoesTipoUsuarioInstance
}
