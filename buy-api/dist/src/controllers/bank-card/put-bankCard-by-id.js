"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBankCardById = void 0;
const db_1 = require("../../db");
const updateBankCardById = async (req, res) => {
    const { id } = req.params;
    const { country, firstname, lastname, cardNumber, expiryDate, cvc } = req.body;
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: "Invalid or missing id parameter" });
    }
    try {
        const updatedBankCard = await db_1.prisma.bankCard.update({
            where: { id: Number(id) },
            data: {
                country,
                firstname,
                lastname,
                cardNumber,
                expiryDate,
                cvc,
                updatedAt: new Date(),
            },
        });
        return res.status(200).json({ bankCard: updatedBankCard });
    }
    catch (error) {
        console.error("Error updating bank card:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateBankCardById = updateBankCardById;
//# sourceMappingURL=put-bankCard-by-id.js.map