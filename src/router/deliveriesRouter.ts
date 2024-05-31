import express from "express";
import { DeliveriesController } from "../controller/DeliveriesController";
import { DeliveriesBusiness } from "../business/DeliveriesBusiness";
import { DeliveriesData } from "../data/DeliveriesData";
import { MotoboyData } from "../data/MotoboyData";
import { StatusData } from "../data/StatusData";
import { PaymentMethodData } from "../data/PaymentMethodData";
import { UserTypePermissionsData } from "../data/UserTypePermissionsData";
import { CollaboratorData } from "../data/CollaboratorData";
import { DeliveryFeeData } from "../data/DeliveryFeeData";

export const deliveriesRouter = express.Router();
const deliveriesData = new DeliveriesData();
const motoboyData = new MotoboyData();
const statusData = new StatusData();
const deliveryFeeData = new DeliveryFeeData();
const paymentMethodData = new PaymentMethodData();
const userTypePermissionsData = new UserTypePermissionsData();
const collaboratorData = new CollaboratorData();

const deliveriesBusiness = new DeliveriesBusiness(deliveriesData,motoboyData,statusData,deliveryFeeData,paymentMethodData,userTypePermissionsData,collaboratorData);

const deliveriesController = new DeliveriesController(deliveriesBusiness);

deliveriesRouter.get("/in-progress/:motoboyId", deliveriesController.getDeliveriessInProgressByMotoBoy);
deliveriesRouter.get("/history/:motoboyId", deliveriesController.getHistoryDeliveriesByMotoboy);
deliveriesRouter.get("/history-manager/:motoboyId", deliveriesController.getHistoryDeliveiresByMotoboyFull)
deliveriesRouter.get("/history-manager/", deliveriesController.getHistoryDeliveiresFull)
deliveriesRouter.put("/:id", deliveriesController.updateDeliveryStatusById);
deliveriesRouter.post("/create", deliveriesController.createDelivery);
deliveriesRouter.put("/update-deliver/:id", deliveriesController.updateDeliveryDataById);
