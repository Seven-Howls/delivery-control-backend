import { Model } from "sequelize";

interface IPermissions {
    id: string,
    nome: string,
    nivel: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface PermissionsInstance extends Model<IPermissions>, IPermissions { }

export {
    IPermissions,
    PermissionsInstance
}


