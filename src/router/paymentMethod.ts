import express from "express";
import { PaymentMethodBusiness } from "../business/PaymentMethodBusiness";
import { PaymentMethodController } from "../controller/PaymentMethodController";
import { PaymentMethodData } from "../data/PaymentMethodData";


export const paymentRouter = express.Router();
const paymentMethodData = new PaymentMethodData();

const paymentMethodBusiness = new PaymentMethodBusiness(paymentMethodData);

const paymentMethodController = new PaymentMethodController(paymentMethodBusiness);

paymentRouter.get("/", paymentMethodController.getPayment);