import { UserTypePermissions } from "../Definitions/UserTypePermissions";
import { IUserTypePermissions, IUserTypePermissionsData } from "../models/InterfaceUserTypePermissions";

export class UserTypePermissionsData implements IUserTypePermissionsData { 
    private userTypePermissions: typeof UserTypePermissions
    constructor(){
        this.userTypePermissions = UserTypePermissions
    }

    findByTypeUser= async (typeUser: string): Promise<IUserTypePermissions[] | null> => {

        try{
            const userTypePermissions = await this.userTypePermissions.findAll({
                where: {
                    tipoUsuarioId: typeUser
                }
            })

            return userTypePermissions
        }catch(error: any){
            throw new Error(error.message)
        }
        
    }
}