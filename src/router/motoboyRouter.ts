import express from "express";
import { MotoboyController } from "../controller/MotoboyController";
import { MotoboyBusiness } from "../business/MotoboyBusiness";
import { MotoboyData } from "../data/MotoboyData";
import { UserData } from "../data/UserData";

export const motoboyRouter = express.Router();
const motoboyData = new MotoboyData();
const userData = new UserData();

const motoboyBusiness = new MotoboyBusiness(motoboyData, userData);

const motoboyController = new MotoboyController(motoboyBusiness);

motoboyRouter.get("/", motoboyController.getMotoboyByUserId);