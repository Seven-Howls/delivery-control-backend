import { Op } from "sequelize";
import { UserType } from "../Definitions/UserType";
import { IUserType, IUserTypeData } from "../models/InterfaceUserType";

export class UserTypeData implements IUserTypeData { 
    private userType: typeof UserType
    constructor(){
        this.userType = UserType
    }

    findById = async (id: string): Promise<IUserType | null> => {
        try {
            const userTypeData = await this.userType.findOne({
                where: {
                    id,
                    deletedAt: {
                        [Op.is]: null
                    }
                }
            });

            return userTypeData;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    findAll = async (companyId: string): Promise<IUserType[] | null> => {
        try {
            const userTypeData = await this.userType.findAll({
                where: {
                    empresaId: companyId,
                    deletedAt: {
                        [Op.is]: null
                    }
                }
            });

            return userTypeData;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}
