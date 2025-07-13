"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfileController = void 0;
const db_1 = require("../../db");
const createProfileController = async (req, res) => {
    const { name, about, avatarImage, socialMediaUrl, backgroundImage, successMessage, userId, } = req.body;
    try {
        if (!name || !userId) {
            return res.status(400).json({
                message: "Name and userId are required",
                error: "MISSING_REQUIRED_FIELDS",
            });
        }
        const user = await db_1.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: "USER_NOT_FOUND",
            });
        }
        const existingProfile = await db_1.prisma.profile.findUnique({
            where: { userId },
        });
        if (existingProfile) {
            return res.status(409).json({
                message: "Profile already exists for this user",
                error: "PROFILE_EXISTS",
            });
        }
        const newProfile = await db_1.prisma.profile.create({
            data: {
                name,
                about,
                avatarImage,
                socialMediaUrl,
                backgroundImage,
                successMessage,
                userId,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        return res.status(201).json({
            message: "Profile created successfully",
            data: newProfile,
        });
    }
    catch (error) {
        console.error("Create profile error:", error);
        if (error && typeof error === "object" && "code" in error) {
            if (error.code === "P2002") {
                return res.status(409).json({
                    message: "Profile already exists for this user",
                    error: "DUPLICATE_PROFILE",
                });
            }
            if (error.code === "P2003") {
                return res.status(400).json({
                    message: "Invalid user ID",
                    error: "FOREIGN_KEY_CONSTRAINT",
                });
            }
        }
        return res.status(500).json({
            message: "Internal server error",
            error: "SERVER_ERROR",
        });
    }
};
exports.createProfileController = createProfileController;
//# sourceMappingURL=createProfileControlller.js.map