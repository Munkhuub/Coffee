"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = void 0;
const db_1 = require("../../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword, userId } = req.body;
        const user = await db_1.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, password: true },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isCurrentPasswordValid = await bcrypt_1.default.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            return res.status(400).json({ error: `Current password is incorrect` });
        }
        const hashedNewPassword = await bcrypt_1.default.hash(newPassword, 12);
        await db_1.prisma.user.update({
            where: { id: userId },
            data: {
                password: hashedNewPassword,
                passwordChangedAt: new Date(),
            },
        });
        return res.status(200).json({ message: `Passwor changed succesfully` });
    }
    catch (error) {
        console.error("Change password error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
exports.changePassword = changePassword;
//# sourceMappingURL=change-password.js.map