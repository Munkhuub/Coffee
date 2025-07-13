"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileById = void 0;
const db_1 = require("../../db");
const getProfileById = async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    if (isNaN(userId)) {
        return res.status(400).json({ message: "Invalid user ID" });
    }
    try {
        const profile = await db_1.prisma.profile.findUnique({
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
};
exports.getProfileById = getProfileById;
//# sourceMappingURL=get-profile.js.map