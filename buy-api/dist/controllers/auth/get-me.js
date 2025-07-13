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
exports.getMe = void 0;
const db_1 = require("../../db");
const getMe = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: Missing user ID" });
    }
    try {
        const user = yield db_1.prisma.user.findUnique({
            where: { id: userId },
            include: {
                profile: true,
                bankCard: true,
                receivedDonations: {
                    include: {
                        donor: {
                            include: {
                                profile: true,
                            },
                        },
                    },
                },
            },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Server error" });
    }
});
exports.getMe = getMe;
//# sourceMappingURL=get-me.js.map