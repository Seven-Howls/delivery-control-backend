import { Op, QueryTypes } from "sequelize";
import { Motoboy, Company, User } from "../Definitions/index";
import { IMotoboy, IMotoboyData } from "../models/InterfaceMotoboy";
import { CustomError } from "../utils/CustomError";
import { v4 as uuid4 } from "uuid";
import { generateUuid } from "../utils/generateUuid";
import { TPersonalDataOfMotoboy } from "../types/TPersonalDataOfMotoboy";
import { TMotoboyOfCompany, TMotoboyOfCompanyPagination } from "../types/TMotoboyOfCompany";
import { create } from "domain";

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

    findMotoboyByUserId = async (usuarioId: string): Promise<TMotoboyOfCompany[]> => {
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
            return motoboy as unknown as TMotoboyOfCompany[]
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

    findPersonalDataOfMotoboy = async (motoboyId:string): Promise<TPersonalDataOfMotoboy> => {
        try{
            const motoboy = await this.motoboy.sequelize?.query(
                `
                    select * from motoboys m 
                    inner join usuarios u on m.usuario_id = u.id 
                    where m.usuario_id = :motoboyId
                `,
                {
                    type: QueryTypes.SELECT,
                    replacements: { motoboyId }
                }
            )
            return motoboy as unknown as TPersonalDataOfMotoboy
        }catch (error: any){
            throw new CustomError(error.message, 500);
        }
    }

    findAllByCompanyId = async (empresaId: string, page: number, perPage: number): Promise<TMotoboyOfCompanyPagination[] | null> => {
        try{
            const offset = (page - 1) * perPage
            const {count,rows} = await this.motoboy.findAndCountAll({
                where: {
                    empresaId,
                    deletedAt: {
                        [Op.is]: null
                    }
                },
                include:[
                    {
                        model: Company,
                        as: 'motoboyCompany',
                        attributes: ['id','nome_fantasia']
                    },
                    {
                        model: User,
                        as: "usuario",
                        attributes: ['nome','cpf','celular','email']
                    }
                ],
                limit: perPage,
                offset,
                order: [['created_at', "ASC"]]
            })
            return {
                motoboys: rows,
                page,
                perPage,
                total: count } as unknown as TMotoboyOfCompanyPagination[]
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
