import { Model } from "sequelize";

interface IUsuario {
    id: string,
    nome: string,
    cpf: string,
    senha: string,
    celular: number,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface UsuarioInstance extends Model<IUsuario>, IUsuario { }

export {
    IUsuario,
    UsuarioInstance
}
