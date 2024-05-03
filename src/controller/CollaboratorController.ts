import { Request, Response } from "express";
import { CollaboratorBusiness } from "../business/CollaboratorBusiness";

export class CollaboratorController {
    private userBusiness: CollaboratorBusiness
    constructor(userBusiness: CollaboratorBusiness) {
        this.userBusiness = userBusiness;
    }

    signup = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string;
            const {user, companyId, typeId} = req.body;
            await this.userBusiness.signup(user, companyId, typeId, token);
            res.status(201).send({message: "Colaborador criado com sucesso"});
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    };

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { cpf, password } = req.body;
            const token = await this.userBusiness.login({ cpf, password });
            res.status(200).json({ token }).send();
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    };
}
