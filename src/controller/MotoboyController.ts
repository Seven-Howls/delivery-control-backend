
import { Request, Response } from "express";
import { MotoboyBusiness } from "../business/MotoboyBusiness";
import { CustomError } from "../utils/CustomError";
import { getPaginationParams } from "../utils/getPaginationParams";
export class MotoboyController{
    private motoboyBusiness: MotoboyBusiness;

    constructor(motoboyBusiness: MotoboyBusiness){
        this.motoboyBusiness = motoboyBusiness;
    }
    getMotoboyByUserId= async( req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string;
            const userId = req.query.userId;
            const motoboy = await this.motoboyBusiness.getMotoboyByUserId(token,userId as string);
            res.status(200).json(motoboy).send();
        }catch(error: CustomError | any){
            res.status(error.statusCode || 400).send({error: error.message})
        }
    }

    getAllMotoboys = async (req: Request, res: Response) => {
        try{
            const token = req.headers.authorization as string;
            const [page, perPage] = getPaginationParams(req.query);
            const motoboy = await this.motoboyBusiness.getAllMotoboys(token, page, perPage);
            res.status(200).json(motoboy).send();
        }catch(error: CustomError | any){
            res.status(error.statusCode || 400).send({error: error.message})
        }  
    }

    signup = async (req: Request, res: Response): Promise<void> => {
        try {
            const token =  req.headers.authorization as string;
            const {userData} = req.body;
            await this.motoboyBusiness.signup(token, userData);
            
            res.status(201).send({message: "Motoboy cadastrado com sucesso"})
        } catch (error: any) {
            res.status(error.statusCode || 400).send({error: error.message})
        }
    }
    
    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const { cpf, password } = req.body
            const loginData = await this.motoboyBusiness.login(cpf,password);
            res.status(200).json(loginData);
        } catch (error: any) {
            res.status(error.statusCode || 400).send({error: error.message})
        }
    }
    updateMotoboy = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string;
            const motoboyId = req.params.motoboyId as string;
            const data = req.body;
            await this.motoboyBusiness.updateMotoboy(token, data, motoboyId);
            res.status(200).send({ message: "Dados do motoboy atualizados com sucesso" });
        } catch (error: CustomError | any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }
    
    getUserData = async (req: Request, res: Response): Promise<void> => {
        try {
            const token = req.headers.authorization as string;
            const user = await this.motoboyBusiness.getUserData(token);
            res.status(200).json(user)
        } catch (error: CustomError | any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }
}
    
    

