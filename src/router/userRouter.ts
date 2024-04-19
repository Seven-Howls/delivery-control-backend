import express from "express";
import { UserController } from "../controller/UserController";
import { UserBusiness } from "../business/UserBusiness";
import { UserData } from "../data/UserData";
export const userRouter = express.Router();

const userBusiness = new UserBusiness(new UserData());

const userController = new UserController(userBusiness);

/* userRouter.post("/signup", userController.signup); */
userRouter.post("/login", userController.login);