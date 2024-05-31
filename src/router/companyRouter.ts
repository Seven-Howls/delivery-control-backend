import express from "express";
import { CompanyController } from "../controller/CompanyController";
import { CompanyBusiness } from "../business/CompanyBusiness"
import { CompanyData } from "../data/CompanyData";


export const companyRouter = express.Router();

const companyData = new CompanyData();

const companyBusiness = new CompanyBusiness(companyData);
const companyController = new CompanyController(companyBusiness);

companyRouter.get('/user', companyController.getCompanyUser);
companyRouter.get('/', companyController.getCompany);
