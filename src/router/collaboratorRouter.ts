import express from "express";
import { UserData } from "../data/UserData";
import { CollaboratorData } from "../data/CollaboratorData";
import { UserTypePermissionsData } from "../data/UserTypePermissionsData";
import { CompanyData } from "../data/CompanyData";
import { UserTypeData } from "../data/UserTypeData";
import { CollaboratorBusiness } from "../business/CollaboratorBusiness";
import { CollaboratorController } from "../controller/CollaboratorController";
export const collaboratorRouter = express.Router();

const collaboradorBusiness = new CollaboratorBusiness(new UserData(),new CollaboratorData(), new UserTypePermissionsData(), new CompanyData(), new UserTypeData());

const collaboradorController = new CollaboratorController(collaboradorBusiness);

collaboratorRouter.post("/signup", collaboradorController.signup);
collaboratorRouter.post("/login", collaboradorController.login);
collaboratorRouter.get("/findall", collaboradorController.FindAllColaborators);
