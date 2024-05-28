import express from "express";
import { DeliveriesFeeBusiness } from "../business/DeliveriesFeeBusiness";
import { DeliveriesFeeController } from "../controller/DeliveriesFeeController";
import { DeliveryFeeData } from "../data/DeliveryFeeData";

export const deliveriesFeeRouter = express.Router();

const deliveiresFeeData = new DeliveryFeeData;
const deliveriesFeeBusiness = new DeliveriesFeeBusiness(deliveiresFeeData);
const deliveriesFeeController = new DeliveriesFeeController(deliveriesFeeBusiness);

deliveriesFeeRouter.get('/', deliveriesFeeController.getAllDeliveryFee);
deliveriesFeeRouter.get('/:id', deliveriesFeeController.getDeliveryFeeById);
deliveriesFeeRouter.post('/', deliveriesFeeController.createDeliveryFee);