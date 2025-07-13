"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDonationsByRecipient = void 0;
const db_1 = require("../../db");
const getDonationsByRecipient = async (req, res) => {
    const recipientId = parseInt(req.params.userId);
    try {
        const donations = await db_1.prisma.donation.findMany({
            where: { recipientId },
            include: {
                donor: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
        return res.status(200).json({ donations });
    }
    catch (error) {
        console.error("Failed to fetch donations:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getDonationsByRecipient = getDonationsByRecipient;
//# sourceMappingURL=getDonationsByRecipient.js.map