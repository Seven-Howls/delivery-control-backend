import { Model } from "sequelize";
import { TCreateUserData } from "../types/TCreateUserData";
import { TUpdateUser } from "../types/TUpdateUser";

interface IUser {
    id: string,
    nome: string,
    cpf: string,
    senha: string,
    celular: number,
    email: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface UserInstance extends Model<IUser>, IUser { }

interface IUserData{
    findByCpf(cpf: string, deleted: boolean): Promise<IUser | null>
    findById(id: string): Promise<IUser | null>
    findByEmail(email: string): Promise<IUser | null>
    insertUser(data: TCreateUserData): Promise<IUser | null>
    updateUser(data: TUpdateUser): Promise<void>
}

export {
    IUser,
    UserInstance,
    IUserData
}
