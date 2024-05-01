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

interface ICollaboratorData {
    findById(id: string): Promise<ICollaborator | null>
    findByUserIdAndCompanyId(userId: string, companyId: string): Promise<ICollaborator | null >
}

export {
    ICollaborator,
    CollaboratorInstance,
    ICollaboratorData
}
