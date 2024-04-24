import { Op } from "sequelize";
import { Status } from "../definitions/index";
import { IStatus } from "../models/InterfaceStatus";
import { IStatusData } from "../models/InterfaceStatusData";
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

}