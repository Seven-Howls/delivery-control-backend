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


interface IPermissionData {
    findAll(id: string): Promise<IPermissionData[] | null>
}

export {
    IPermissions,
    PermissionsInstance,
    IPermissionData
}


