import { Op } from "sequelize";
import { Company } from "../Definitions";
import { ICompany, ICompanyData } from "../models/InterfaceCompany";

export class CompanyData implements ICompanyData{
    private company: typeof Company;

    constructor() {
        this.company = Company;
    }

    findById = async (id: string): Promise<ICompany | null> => {
        try{
            const company = await this.company.findOne({
                where: {
                    id,
                    deletedAt: {
                        [Op.is]: null
                    }
                }
            })

            return company;
        } catch (error: any){
            throw new Error(error.message);
        }
    }
}
