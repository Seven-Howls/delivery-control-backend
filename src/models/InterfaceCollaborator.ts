import { Model } from "sequelize";

interface ICollaborator {
    id: string,
    tipoId: string,
    empresaId: string,
    usuarioId: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date | null
}

interface CollaboratorInstance extends Model<ICollaborator>, ICollaborator { }

export {
    ICollaborator,
    CollaboratorInstance
}
