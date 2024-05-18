import express from "express";
import { DeliveriesFeeBusiness } from "../business/DeliveriesFeeBusiness";
import { DeliveriesFeeController } from "../controller/DeliveriesFeeController";
import { DeliveryFeeData } from "../data/DeliveryFeeData";
import { CompanyData } from "../data/CompanyData";
import { UserTypePermissionsData } from "../data/UserTypePermissionsData";

export const deliveriesFeeRouter = express.Router();

const deliveiresFeeData = new DeliveryFeeData;
const companyData = new CompanyData();
const userTypePermissionsData = new UserTypePermissionsData();

const deliveriesFeeBusiness = new DeliveriesFeeBusiness(deliveiresFeeData,companyData,userTypePermissionsData);
const deliveriesFeeController = new DeliveriesFeeController(deliveriesFeeBusiness);

deliveriesFeeRouter.get('/', deliveriesFeeController.getAllDeliveryFee);
deliveriesFeeRouter.get('/:id', deliveriesFeeController.getDeliveryFeeById);
deliveriesFeeRouter.post('/', deliveriesFeeController.createDeliveryFee);
deliveriesFeeRouter.put('/:id',deliveriesFeeController.updateDeliveryFee)
