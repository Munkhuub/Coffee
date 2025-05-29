import { Router } from "express";
import { createDonationController } from "../controllers/donation/createDonationController";
import { getDonation } from "../controllers/donation/get-donation";

export const donationRouter = Router();

donationRouter.post("/", createDonationController);
donationRouter.get("/:userId", getDonation);
