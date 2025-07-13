"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = void 0;
const db_1 = require("../../db");
const getMe = async (req, res) => {
    const userId = req.userId;
    if (!userId) {
        return res.status(401).json({ message: "Unauthorized: Missing user ID" });
    }
    try {
        const user = await db_1.prisma.user.findUnique({
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
};
exports.getMe = getMe;
//# sourceMappingURL=get-me.js.map