import express from "express";
import { UserTypeData } from "../data/UserTypeData";
import { CompanyData } from "../data/CompanyData";
import { UserTypeBusiness } from "../business/UserTypeBusiness";
import { UserTypeConotroller } from "../controller/UserTypeConotroller";

export const userTypeRouter = express.Router();
const companyData = new CompanyData();
const userTypeData = new UserTypeData();

const userTypeBusiness = new UserTypeBusiness(userTypeData,companyData);

const userTypeController = new UserTypeConotroller(userTypeBusiness);

userTypeRouter.get("/all", userTypeController.findAll);
