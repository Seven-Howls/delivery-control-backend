import { Request, Response } from "express";
import { CompanyBusiness } from "../business/CompanyBusiness";
import { CustomError } from "../utils/CustomError";

export class CompanyController {
    private companyBusiness: CompanyBusiness;

    constructor(companyBusiness: CompanyBusiness) {
        this.companyBusiness = companyBusiness;
    }
    
    getCompanyUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { cpf } = req.query

            const companys = await this.companyBusiness.getCompanyUser(cpf as string)

            res.status(200).json(companys)
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }
    
    getCompany = async (req: Request, res: Response): Promise<void> => {
        try {
            const companys = await this.companyBusiness.getCompany()

            res.status(200).json(companys)
        } catch (error: any) {
            res.status(error.statusCode || 400).send({ error: error.message });
        }
    }

}
