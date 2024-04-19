import { Model } from "sequelize";

interface IUserType {
    id: string,
    empresaId: string,
    nome: string,
    nivel: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface UserTypeInstance extends Model<IUserType>, IUserType { }

export {
    IUserType,
    UserTypeInstance
}
