"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.donationRouter = void 0;
const express_1 = require("express");
const createDonationController_1 = require("../controllers/donation/createDonationController");
const getDonationsByRecipient_1 = require("../controllers/donation/getDonationsByRecipient");
exports.donationRouter = (0, express_1.Router)();
exports.donationRouter.post("/", createDonationController_1.createDonationController);
exports.donationRouter.get("/:userId", getDonationsByRecipient_1.getDonationsByRecipient);
//# sourceMappingURL=donation.route.js.map