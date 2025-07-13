"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDonationController = void 0;
const db_1 = require("../../db");
const createDonationController = async (req, res) => {
    const { amount, specialMessage, socialURLOrBuyMeACoffee, donorId, recipientId, } = req.body;
    try {
        const Donation = await db_1.prisma.donation.create({
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
};
exports.createDonationController = createDonationController;
//# sourceMappingURL=createDonationController.js.map