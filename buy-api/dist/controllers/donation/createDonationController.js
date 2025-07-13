"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDonationController = void 0;
const db_1 = require("../../db");
const createDonationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, specialMessage, socialURLOrBuyMeACoffee, donorId, recipientId, } = req.body;
    try {
        const Donation = yield db_1.prisma.donation.create({
            data: {
                amount,
                specialMessage,
                socialURLOrBuyMeACoffee,
                donorId,
                recipientId,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        return res
            .status(200)
            .json({ message: "Donation created succesfully", Donation });
    }
    catch (error) {
        console.error("Failed to create donation", error);
    }
});
exports.createDonationController = createDonationController;
//# sourceMappingURL=createDonationController.js.map