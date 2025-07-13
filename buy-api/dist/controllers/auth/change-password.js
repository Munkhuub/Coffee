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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = void 0;
const db_1 = require("../../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { currentPassword, newPassword, userId } = req.body;
        const user = db_1.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, password: true },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isCurrentPasswordValid = yield bcrypt_1.default.compare(currentPassword, (yield user).password);
        if (!isCurrentPasswordValid) {
            return res.status(400).json({ error: `Current password is incorrect` });
        }
        const hashedNewPassword = yield bcrypt_1.default.hash(newPassword, 12);
        yield db_1.prisma.user.update({
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
        if (error.message === "User not found") {
            return res.status(404).json({ error: "User not found" });
        }
        if (error.message === "Current password is incorrect") {
            return res.status(400).json({ error: "Current password is incorrect" });
        }
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.changePassword = changePassword;
//# sourceMappingURL=change-password.js.map