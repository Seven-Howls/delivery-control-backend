import express from "express";
import { MotoboyController } from "../controller/MotoboyController";
import { MotoboyBusiness } from "../business/MotoboyBusiness";
import { MotoboyData } from "../data/MotoboyData";
import { UserData } from "../data/UserData";
import { CompanyData } from "../data/CompanyData";
import { UserTypePermissionsData } from "../data/UserTypePermissionsData";
import { CollaboratorData } from "../data/CollaboratorData";

export const motoboyRouter = express.Router();

const motoboyBusiness = new MotoboyBusiness(new MotoboyData(), new UserData(), new CompanyData(), new CollaboratorData(), new UserTypePermissionsData());

const motoboyController = new MotoboyController(motoboyBusiness);

motoboyRouter.get("/", motoboyController.getMotoboyByUserId);
motoboyRouter.post('/signup', motoboyController.signup)


