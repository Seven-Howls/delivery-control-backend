import { Model } from "sequelize";

interface IUserTypePermissions {
    id: string,
    permissaoId: number,
    tipoUsuarioId: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface UserTypePermissionsInstance extends Model<IUserTypePermissions>, IUserTypePermissions { }

interface IUserTypePermissionsData {
    findByTypeUser(typeUser: string): Promise<IUserTypePermissions[] | null>
}

export {
    IUserTypePermissions,
    UserTypePermissionsInstance,
    IUserTypePermissionsData
}
