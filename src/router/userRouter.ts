import express from "express";
import { UserController } from "../controller/UserController";
import { UserBusiness } from "../business/UserBusiness";
import { UserData } from "../data/UserData";
import { CollaboratorData } from "../data/CollaboratorData";
import { UserTypePermissionsData } from "../data/UserTypePermissionsData";
import { CompanyData } from "../data/CompanyData";
import { UserTypeData } from "../data/UserTypeData";
export const userRouter = express.Router();

const userBusiness = new UserBusiness(new UserData(),new CollaboratorData(), new UserTypePermissionsData(), new CompanyData(), new UserTypeData());

const userController = new UserController(userBusiness);

userRouter.post("/signup/collaborator", userController.signupCollaborator);
userRouter.post("/login", userController.login);