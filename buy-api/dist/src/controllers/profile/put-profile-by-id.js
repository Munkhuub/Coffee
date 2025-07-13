"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfileById = void 0;
const db_1 = require("../../db");
const updateProfileById = async (req, res) => {
    const { id } = req.params;
    const { name, about, avatarImage, socialMediaUrl, backgroundImage, successMessage, } = req.body;
    try {
        const updatedUser = await db_1.prisma.profile.update({
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
        if (error &&
            typeof error === "object" &&
            "code" in error &&
            "meta" in error) {
            const prismaError = error;
            if (prismaError.code === "P2002" &&
                prismaError.meta?.target?.includes("email")) {
                return res
                    .status(400)
                    .json({ message: "This email is already in use." });
            }
        }
        return res.status(500).json({ message: "Server error", error });
    }
};
exports.updateProfileById = updateProfileById;
//# sourceMappingURL=put-profile-by-id.js.map