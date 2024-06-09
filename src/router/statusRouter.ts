import express from "express";
import { UserTypePermissionsData } from './../data/UserTypePermissionsData';
import { UserData } from "../data/UserData";
import { UserBusiness } from "../business/UserBusiness";
import { CompanyData } from "../data/CompanyData";
import { UserController } from '../controller/UserController';
import { StatusData } from "../data/StatusData";
import { StatusBusiness } from "../business/StatusBusiness";
import { StatusController } from "../controller/StatusController";


export const statusRouter = express.Router();
const statusData = new StatusData();

const statusBussiness = new StatusBusiness(statusData);

const statusController = new StatusController(statusBussiness);

statusRouter.get("/", statusController.getAll);
