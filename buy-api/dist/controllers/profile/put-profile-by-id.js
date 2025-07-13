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
exports.updateProfileById = void 0;
const db_1 = require("../../db");
const updateProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id } = req.params;
    const { name, about, avatarImage, socialMediaUrl, backgroundImage, successMessage, } = req.body;
    try {
        const updatedUser = yield db_1.prisma.profile.update({
            where: { id: Number(id) },
            data: {
                name,
                about,
                avatarImage,
                socialMediaUrl,
                backgroundImage,
                successMessage,
                updatedAt: new Date(),
            },
        });
        return res.status(200).json({ user: updatedUser });
    }
    catch (error) {
        console.error("Error updating user:", error);
        if (error.code === "P2002" && ((_b = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target) === null || _b === void 0 ? void 0 : _b.includes("email"))) {
            return res.status(400).json({ message: "This email is already in use." });
        }
        res.status(500).json({ message: "Server error", error });
    }
});
exports.updateProfileById = updateProfileById;
//# sourceMappingURL=put-profile-by-id.js.map