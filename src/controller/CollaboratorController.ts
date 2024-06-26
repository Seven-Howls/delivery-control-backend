import { Request, Response } from "express";
import { CollaboratorBusiness } from "../business/CollaboratorBusiness";

export class CollaboratorController {
    private collaboratorBusiness: CollaboratorBusiness
    constructor(collaboratorBusiness: CollaboratorBusiness) {
        this.collaboratorBusiness = collaboratorBusiness;
    }

    signup = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string;
            const {user} = req.body;
            await this.collaboratorBusiness.signup(user, token);
            res.status(201).send({message: "Colaborador criado com sucesso"});
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    };

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { cpf, password, companyId } = req.body;
            const [token, dataCollaborator] = await this.collaboratorBusiness.login({ cpf, password, companyId });
            res.status(200).json({ token, dataCollaborator }).send();
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    };
    findAllColaborators = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string;

            const collaborators = await this.collaboratorBusiness.findAllCollaborators(token);
            res.status(200).json(collaborators);
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    };
    
    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string;
            const data: any = req.body
            const collaboratoId = req.params.collaboratoId
            await this.collaboratorBusiness.update(token,data,collaboratoId);
            res.status(200).send({ message: "Dados do colaborador atualizados com sucesso" });
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    };
}
