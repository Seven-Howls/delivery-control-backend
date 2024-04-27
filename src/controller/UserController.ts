import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
  private userBusiness: UserBusiness
  constructor(userBusiness: UserBusiness) {
    this.userBusiness = userBusiness;
  }

  /* signupCollaborator = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password } = req.body;
      const token = await this.userBusiness.signup({ name, email, password });
      res.status(200).send({ token });
    } catch (error: any) {
      res.status(error.statusCode || 400).send({ error: error.message });
    }
  }; */

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
