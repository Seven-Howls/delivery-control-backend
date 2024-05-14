import { Op } from "sequelize";
import { UserTypePermissions } from "../Definitions/UserTypePermissions";
import { IUserTypePermissions, IUserTypePermissionsData, UserTypePermissionsInstance } from "../models/InterfaceUserTypePermissions";
import { Permissions } from "../Definitions";
import { TUserTypePermissions } from "../types/TUserTypePermissions";

export class UserTypePermissionsData implements IUserTypePermissionsData { 
    private userTypePermissions: typeof UserTypePermissions
    constructor(){
        this.userTypePermissions = UserTypePermissions
    }

    findByTypeUser = async (typeUser: string): Promise<TUserTypePermissions[] | null> => {

        try{
            const userTypePermissions = await this.userTypePermissions.findAll({
                where: {
                    tipoUsuarioId: typeUser
                },
                include: [
                    {
                        model: Permissions,
                        as: "permissions",
                    }
                ]
            })

            return userTypePermissions as unknown as TUserTypePermissions[]
        }catch(error: any){
            throw new Error(error.message)
        }
        
    }

    findByTypeUserAndLevel = async (typeUser: string, level: number): Promise<TUserTypePermissions | null> => {

        try{
            const userTypePermissions = await this.userTypePermissions.findOne({
                where: {
                    tipoUsuarioId: typeUser,
                    deletedAt: {
                        [Op.is]: null   
                    }
                },
                include: [
                    {
                        model: Permissions,
                        as: "permissions",
                        where: {
                            nivel: level,
                            deletedAt: {
                                [Op.is]: null
                            }
                        }
                    }
                ]
            })

            return userTypePermissions as unknown as TUserTypePermissions
        }catch(error: any){
            throw new Error(error.message)
        }
        
    }
    
    findById = async (id: string): Promise<IUserTypePermissions | null> => {
        try {
            const userTypePermissionsData = await this.userTypePermissions.findOne({
                where: {
                    id,
                    deletedAt: {
                        [Op.is]: null
                    }
                }
            });

            return userTypePermissionsData;
        } catch (error: any) {
            throw new Error(error.message)
        }
    }
}
