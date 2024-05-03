import { Op } from "sequelize";
import { Collaborator } from "../Definitions/Colaborador";
import { ICollaborator, ICollaboratorData } from "../models/InterfaceCollaborator";
import { v4 as uuid4 } from "uuid";

export class CollaboratorData implements ICollaboratorData {
    private collaboratorData: typeof Collaborator

    constructor() {
        this.collaboratorData = Collaborator
    }

    findById = async (id: string): Promise<ICollaborator | null> => {
        try {
            const collaborator =  await this.collaboratorData.findOne({
                where: {
                    id,
                    deletedAt: {
                        [Op.is]: null
                    }
                }
            })

            return collaborator;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
    
    findByUserIdAndCompanyId = async (userId: string, companyId: string): Promise<ICollaborator | null> => {
        try {
            const collaborato = await this.collaboratorData.findOne({
                where: {
                    usuarioId: userId,
                    empresaId: companyId
                }
            });

            return collaborato;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    insertCollaborator = async (userId: string, companyId: string, typeId: string): Promise<ICollaborator | null> => {
        try {
            const collaborator = await this.collaboratorData.create({
                id: uuid4(),
                tipoId: typeId,
                empresaId: companyId,
                usuarioId: userId,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            await collaborator.save();

            return collaborator;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}