import { Op } from "sequelize";
import { Collaborator } from "../Definitions/Colaborador";
import { ICollaborator, ICollaboratorData } from "../models/InterfaceCollaborator";

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
}