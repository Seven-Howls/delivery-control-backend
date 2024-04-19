import { Model } from "sequelize";

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

export {
    IUser,
    UserInstance
}
