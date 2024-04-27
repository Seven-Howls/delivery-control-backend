import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
    private userBusiness: UserBusiness
    constructor(userBusiness: UserBusiness) {
        this.userBusiness = userBusiness;
    }

    signupCollaborator = async (req: Request, res: Response): Promise<void> => {
        try {
            //TODO : Pegar o token
            //TODO : Pegar os dados de usuario empresa e tipo do body
            //TODO : Chamar a funcao do business
            //TODO : Retorna somente uma mensagem dizendoq eu usuario foi criado
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    };

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { cpf, password } = req.body;
            const token = await this.userBusiness.login({ cpf, password });
            res.status(200).json(token).send();
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    };
}
