import express from "express";
import { MotoboyController } from "../controller/MotoboyController";
import { MotoboyBusiness } from "../business/MotoboyBusiness";
import { MotoboyData } from "../data/MotoboyData";

export const motoboyRouter = express.Router();
const motoboyData = new MotoboyData();

const motoboyBusiness = new MotoboyBusiness(motoboyData);

const motoboyController = new MotoboyController(motoboyBusiness);

motoboyRouter.get("/", motoboyController.getMotoboyByUserId);