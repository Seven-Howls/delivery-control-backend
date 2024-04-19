import { Model } from "sequelize";

interface IUserTypePermissions {
    id: string,
    permissaoId: string,
    tipoUsuarioId: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface UserTypePermissionsInstance extends Model<IUserTypePermissions>, IUserTypePermissions { }

export {
    IUserTypePermissions,
    UserTypePermissionsInstance
}
