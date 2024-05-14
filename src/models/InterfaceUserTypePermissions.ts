import { Model } from "sequelize";
import { TUserTypePermissions } from "../types/TUserTypePermissions";

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
    findByTypeUser(typeUser: string): Promise<TUserTypePermissions[] | null>
    findByTypeUserAndLevel(typeUser: string, level: number): Promise<TUserTypePermissions | null>
    findById(id: string): Promise<IUserTypePermissions | null>
}

export {
    IUserTypePermissions,
    UserTypePermissionsInstance,
    IUserTypePermissionsData
}
