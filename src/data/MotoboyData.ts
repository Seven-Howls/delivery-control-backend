import { Op } from "sequelize";
import { Motoboy, Company } from "../Definitions/index";
import { IMotoboy } from "../models/InterfaceMotoboy";
import { IMotoboyData } from "../models/InterfaceMotoboyData";
import { CustomError } from "../utils/CustomError";

export class MotoboyData implements IMotoboyData{
    private motoboy: any

    constructor() {
        this.motoboy = Motoboy
    }

    async findById(motoboyId: string): Promise<IMotoboy | null> {
        try{
            const motoboy = await this.motoboy.findOne({
                where: {
                    id: motoboyId,
                    deletedAt: {
                        [Op.is]: null
                    }
                }}); 

            return motoboy
        }catch(error: any){
            throw new CustomError(error.message, 500);
        }
    }

    async findMotoboyByUserId(userId: string): Promise<any>{
        try{
            const motoboy = await this.motoboy.findAll({
                where: {
                    usuarioId: userId,
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
}