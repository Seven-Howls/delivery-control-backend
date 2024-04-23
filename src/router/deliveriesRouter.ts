import express from "express";
import { DeliveriesController } from "../controller/DeliveriesController";
import { DeliveriesBusiness } from "../business/DeliveriesBusiness";
import { DeliveriesData } from "../data/DeliveriesData";
import { MotoboyData } from "../data/MotoboyData";
import { StatusData } from "../data/StatusData";

export const deliveriesRouter = express.Router();
const deliveriesData = new DeliveriesData();
const motoboyData = new MotoboyData();
const statusData = new StatusData();

const deliveriesBusiness = new DeliveriesBusiness(deliveriesData,motoboyData,statusData);

const deliveriesController = new DeliveriesController(deliveriesBusiness);

deliveriesRouter.get("/in-progress/:motoboyId", deliveriesController.getDeliveriessInProgressByMotoBoy);
deliveriesRouter.get("/history/:motoboyId", deliveriesController.getHistoryDeliveriesByMotoboy);
deliveriesRouter.put("/:id", deliveriesController.updateDeliveryStatusById)