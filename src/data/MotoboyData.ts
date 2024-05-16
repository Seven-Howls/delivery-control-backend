import { Op } from "sequelize";
import { Motoboy, Company } from "../Definitions/index";
import { IMotoboy, IMotoboyData } from "../models/InterfaceMotoboy";
import { CustomError } from "../utils/CustomError";
import { v4 as uuid4 } from "uuid";
import { generateUuid } from "../utils/generateUuid";

export class MotoboyData implements IMotoboyData{
    private motoboy: typeof Motoboy

    constructor() {
        this.motoboy = Motoboy
    }

    findById = async (id: string): Promise<IMotoboy | null> =>{
        try{
            const motoboy = await this.motoboy.findOne({
                where: {
                    id,
                    deletedAt: {
                        [Op.is]: null
                    }
                }}); 

            return motoboy
        }catch(error: any){
            throw new CustomError(error.message, 500);
        }
    }

    findMotoboyByUserId = async (usuarioId: string): Promise<any> => {
        try{
            const motoboy = await this.motoboy.findAll({
                where: {
                    usuarioId,
                    deletedAt: {
                        [Op.is]: null
                    }
                },
                include:[
                    {
                        model: Company,
                        as: 'motoboyCompany',
                        attributes: ['id','nome_fantasia']
                    }
                ]
            })
            return motoboy
        }catch(error: any){
            throw new CustomError(error.message, 500);
        }
    }

    findByUserIdAndCompany = async (usuarioId: string, empresaId: string): Promise<IMotoboy | null> => {
        try{
            const motoboy = await this.motoboy.findOne({
                where: {
                    usuarioId,
                    empresaId,
                    deletedAt: {
                        [Op.is]: null
                    }
                }
            })
            return motoboy
        }catch(error: any){
            throw new CustomError(error.message, 500);
        }
    }

    insert = async (usuarioId: string, empresaId: string): Promise<void> => {
        try {
            const motoboy = await this.motoboy.create({
                id: generateUuid(),
                empresaId,
                usuarioId,
                createdAt: new Date(),
                updatedAt: new Date(),
            })
            await motoboy.save();
        } catch (error: any) {
            throw new CustomError(error.message, 500);
        }
    }
}
