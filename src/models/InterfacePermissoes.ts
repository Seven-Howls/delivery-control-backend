import { Model } from "sequelize";

interface IPermissoes {
    id: string;
    nome: string;
    nivel: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface PermissoesInstance extends Model<IPermissoes>, IPermissoes { }

export {
    IPermissoes,
    PermissoesInstance
}


