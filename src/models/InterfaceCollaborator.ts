import { Model } from "sequelize";
import { TCollaboratorAndUser } from "../types/TCollaboratorAndUser";
import { TUpdateCollaborator } from "../types/TUpdateCollaborator";

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
    findCollaboratorByUserId(userId: string): Promise< ICollaborator[] | null >
    insertCollaborator(userId: string, companyId: string, typeId: string): Promise<ICollaborator | null>
    findCollaboratorsByCompanyId(companyId: string): Promise<TCollaboratorAndUser[] | null>
    update(data: TUpdateCollaborator): Promise<void>
}

export {
    ICollaborator,
    CollaboratorInstance,
    ICollaboratorData
}
