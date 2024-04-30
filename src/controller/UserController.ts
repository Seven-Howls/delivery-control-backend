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
            const token = req.headers.authorization as string;
            //TODO : Pegar os dados de usuario empresa e tipo do body
            const {user, companyId, typeId} = req.body;
            //TODO : Chamar a funcao do business
            await this.userBusiness.signupCollaborator(user, companyId, typeId, token);
            //TODO : Retorna somente uma mensagem dizendoq eu usuario foi criado
            res.status(201).send({message: "Usuario criado com sucesso"});
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
