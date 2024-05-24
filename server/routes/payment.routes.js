import { Router } from "express";
import { capturePayment, verifySignature } from "../controllers/capturePayment.controller.js";
import { getRazorpayKey } from "../controllers/getRazorpayKey.controller.js";

export const paymentRouter = Router();


paymentRouter.route("/getKey").get(getRazorpayKey);
paymentRouter.route("/order").post(capturePayment);
paymentRouter.route("/payment-verification").post(verifySignature);