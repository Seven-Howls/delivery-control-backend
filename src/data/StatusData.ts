import { Op } from "sequelize";
import { Status } from "../Definitions/index";
import { IStatus, IStatusData } from "../models/InterfaceStatus";
import { CustomError } from "../utils/CustomError";

export class StatusData implements IStatusData {
    private status: any

    constructor() {
        this.status = Status
    }

    getStatusById = async (id: string): Promise<IStatus | null> => {
        try {
            const status = await this.status.findOne({
                attributes: ['id','nome'],
                where:{
                    id,
                    deletedAt: {
                        [Op.is]: null
                    }
                }
            })
            
            return status
        } catch (error: any) {
            throw new CustomError(error.message, 500);
        }
    }

    getAll = async (): Promise<IStatus[] | null> => {
        try {
            const status = await this.status.findAll({
                attributes: ['id','nome'],
                where:{
                    deletedAt: {
                        [Op.is]: null
                    }
                }
            })
            
            return status
        } catch (error: any) {
            throw new CustomError(error.message, 500);
        }
    }

}