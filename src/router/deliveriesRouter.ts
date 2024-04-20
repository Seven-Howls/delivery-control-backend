import express from "express";
import { DeliveriesController } from "../controller/DeliveriesController";
import { DeliveriesBusiness } from "../business/DeliveriesBusiness";
import { DeliveriesData } from "../data/DeliveriesData";
import { MotoboyData } from "../data/MotoboyData";

export const deliveriesRouter = express.Router();
const deliveriesData = new DeliveriesData();
const motoboyData = new MotoboyData()

const deliveriesBusiness = new DeliveriesBusiness(deliveriesData,motoboyData);
console.log(deliveriesBusiness)
const deliveriesController = new DeliveriesController(deliveriesBusiness);

deliveriesRouter.get("/in-progress/:motoboyId", deliveriesController.getDeliveriessInProgressByMotoBoy);