import { Op } from "sequelize";
import { UserType } from "../Definitions/UserType";
import { IUserType, IUserTypeData } from "../models/InterfaceUserType";
import { SetRequired } from "sequelize/types/utils/set-required";
import { Permissions } from "../Definitions";

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

    findPermissionByUserType = async (id: string) => {
        try {
            const userType = await this.userType.findOne({
                attributes:{ 
                    exclude: ['createdAt','updatedAt','deletedAt']
                },
                where: {
                    id,
                    deletedAt: {
                        [Op.is]: null
                    }
                },
                include: {
                    model: Permissions,
                    as: "permissionsDetails",
                    attributes:{ 
                        exclude: ['createdAt','updatedAt','deletedAt']
                    },
                    where: {
                        deletedAt: {
                            [Op.is]: null
                        }
                    },
                    through:{
                        attributes:[]
                    }
                }

            });

            return userType;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}
