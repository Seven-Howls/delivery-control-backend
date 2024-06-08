import express from "express";
import { UserTypeData } from "../data/UserTypeData";
import { CompanyData } from "../data/CompanyData";
import { PermissionBusiness } from "../business/PermissionsBusiness";
import { PermissionConotroller } from "../controller/PermissionController";

export const permissionRouter = express.Router();
const companyData = new CompanyData();
const userTypeData = new UserTypeData();

const permissionBusiness = new PermissionBusiness(userTypeData,companyData);

const permissionController = new PermissionConotroller(permissionBusiness);

permissionRouter.get("/user-type", permissionController.findAll);
