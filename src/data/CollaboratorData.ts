import { Op } from "sequelize";
import { Collaborator } from "../Definitions/Colaborador";
import { ICollaborator, ICollaboratorData } from "../models/InterfaceCollaborator";
import { TCollaboratorAndCompany } from "../types/TCollaboratorAndCompany";
import { Company } from "../Definitions";
import { generateUuid } from "../utils/generateUuid";

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

    findCollaboratorByUserId = async (userId: string): Promise< ICollaborator[] |null> =>{
        try {
            const collaborator = await this.collaboratorData.findAll({
                attributes: ['id', 'tipoId', 'empresaId', 'usuarioId'],
                where: {
                    usuarioId: userId,
                    deletedAt: {
                        [Op.is]: null
                    }
                },
                include: [
                    {
                        model: Company,
                        as: 'collaboratorCompany',
                        attributes: ['id','nomeFantasia','urlLogo']
                    }
                ]
            })

            return collaborator;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    insertCollaborator = async (userId: string, companyId: string, typeId: string): Promise<ICollaborator | null> => {
        try {
            const collaborator = await this.collaboratorData.create({
                id: generateUuid(),
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
