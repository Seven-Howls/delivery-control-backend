
import { Request, Response } from "express";
import { MotoboyBusiness } from "../business/MotoboyBusiness";
import { CustomError } from "../utils/CustomError";
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
    getAllMotoboysByCompanyId= async( req: Request, res: Response): Promise<void> => {
        try{
            const token = req.headers.authorization as string;
            const motoboy = await this.motoboyBusiness.getAllMotoboysByCompanyId(token);
            res.status(200).json(motoboy).send();
        }catch(error: CustomError | any){
            res.status(error.statusCode || 400).send({error: error.message})
        }
    }

    getAllMotoboys = async (req: Request, res: Response) => {
        try{
            const token = req.headers.authorization as string;
            const motoboy = await this.motoboyBusiness.getAllMotoboys(token);
            res.status(200).json(motoboy).send();
        }catch(error: CustomError | any){
            res.status(error.statusCode || 400).send({error: error.message})
        }  
    }

    signup = async (req: Request, res: Response): Promise<void> => {
        try {
            const token =  req.headers.authorization as string;
            const {userData, empresaId} = req.body;
            await this.motoboyBusiness.signup(token, empresaId, userData);
            
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
}
