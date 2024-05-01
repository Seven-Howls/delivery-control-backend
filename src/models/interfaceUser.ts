import { Model } from "sequelize";
import { TSignupUserData } from "../types/TSignupUserData";

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
}

export {
    IUser,
    UserInstance,
    IUserData
}
