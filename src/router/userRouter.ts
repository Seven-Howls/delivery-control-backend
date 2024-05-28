import express from "express";
import { UserTypePermissionsData } from './../data/UserTypePermissionsData';
import { UserData } from "../data/UserData";
import { UserBusiness } from "../business/UserBusiness";
import { CompanyData } from "../data/CompanyData";
import { UserController } from '../controller/UserController';


export const userRouter = express.Router();
const userData = new UserData();
const companyData = new CompanyData();
const userTypePermissionsData = new UserTypePermissionsData();

const userBusiness = new UserBusiness(userData,companyData,userTypePermissionsData);

const userController = new UserController(userBusiness);

userRouter.put("/:id", userController.update);
