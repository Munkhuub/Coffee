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
exports.updateBankCardById = void 0;
const db_1 = require("../../db");
const updateBankCardById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { country, firstname, lastname, cardNumber, expiryDate, cvc } = req.body;
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: "Invalid or missing id parameter" });
    }
    try {
        const updatedBankCard = yield db_1.prisma.bankCard.update({
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
});
exports.updateBankCardById = updateBankCardById;
//# sourceMappingURL=put-bankCard-by-id.js.map