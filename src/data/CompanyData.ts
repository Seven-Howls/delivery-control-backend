import { Op, QueryTypes } from "sequelize";
import { Company } from "../Definitions";
import { ICompany, ICompanyData } from "../models/InterfaceCompany";

export class CompanyData implements ICompanyData {
    private company: typeof Company;

    constructor() {
        this.company = Company;
    }

    findById = async (id: string): Promise<ICompany | null> => {
        try {
            const company = await this.company.findOne({
                where: {
                    id,
                    deletedAt: {
                        [Op.is]: null,
                    },
                },
            });

            return company;
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    findAll = async (): Promise<ICompany[] | null> => {
        try {
            const company = await this.company.sequelize?.query(
                `
                SELECT
                    e.*
                FROM empresas e
            `,
                {
                    type: QueryTypes.SELECT,
                }
            );

            return company as ICompany[];
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    findAllByUser = async (cpf: string): Promise<ICompany[] | null> => {
        try {
            const companies = await this.company.sequelize?.query(
                `
                SELECT 
                    e.*
                FROM empresas e 
                INNER JOIN 	colaboradores c 
                ON c.empresa_id = e.id 
                INNER JOIN usuarios u 
                ON u.id  = c.usuario_id 
                WHERE u.cpf = :cpf
                AND u.deleted_at IS NULL 
                AND c.deleted_at IS NULL 
                AND e.deleted_at IS NULL
            `,
                {
                    type: QueryTypes.SELECT,
                    replacements: { cpf },
                }
            );

            return companies as ICompany[];
        } catch (error: any) {
            throw new Error(error.message);
        }
    };
}
