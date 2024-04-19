import { ICompany } from "./InterfaceCompany";

export interface ICompanyData{
    findCompanyByUserId(userId: string): Promise<ICompany | null>
}