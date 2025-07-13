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
exports.getProfileById = void 0;
const db_1 = require("../../db");
const getProfileById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    try {
        const profile = yield db_1.prisma.profile.findUnique({
            where: { userId },
        });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        return res.status(200).json(profile);
    }
    catch (error) {
        console.error("Error fetching profile:", error);
        return res.status(500).json({ message: "Server error", error });
    }
});
exports.getProfileById = getProfileById;
//# sourceMappingURL=get-profile.js.map