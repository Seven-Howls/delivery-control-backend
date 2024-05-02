import { Model } from "sequelize";
import { TSignupUserData } from "../types/TSignupUserData";
import { TUpdateUser } from "../types/TUpdateUser";

interface IUser {
    id: string,
    nome: string,
    cpf: string,
    senha: string,
    celular: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface UserInstance extends Model<IUser>, IUser { }

interface IUserData{
    findByCpf(cpf: string, deleted: boolean): Promise<IUser | null>
    findById(id: string): Promise<IUser | null>
    insertUser(data: TSignupUserData): Promise<IUser | null>
    updateUser(data: TUpdateUser): Promise<void>
}

export {
    IUser,
    UserInstance,
    IUserData
}
