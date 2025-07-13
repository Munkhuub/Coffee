"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../../db");
const signup = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res
            .status(400)
            .json({ message: "Username, email, and password are required" });
    }
    try {
        const existingUser = await db_1.prisma.user.findFirst({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const existingUsername = await db_1.prisma.user.findFirst({
            where: { username },
        });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already taken" });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        const newUser = await db_1.prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            include: {
                profile: true,
                bankCard: true,
                sentDonations: {
                    include: {
                        recipient: {
                            include: { profile: true },
                        },
                    },
                },
                receivedDonations: {
                    include: {
                        donor: {
                            include: { profile: true },
                        },
                    },
                },
            },
        });
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error("JWT_SECRET environment variable is not set");
            return res.status(500).json({ message: "Server configuration error" });
        }
        const token = jsonwebtoken_1.default.sign({
            userId: newUser.id,
        }, jwtSecret);
        const { password: _, ...userWithoutPassword } = newUser;
        return res.status(201).json({
            user: userWithoutPassword,
            token: `Bearer ${token}`,
        });
    }
    catch (error) {
        console.error("Signup error:", error);
        if (error &&
            typeof error === "object" &&
            "code" in error &&
            error.code === "P2002") {
            return res
                .status(400)
                .json({ message: "Email or username already exists" });
        }
        return res.status(500).json({
            message: "Server Error",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.signup = signup;
//# sourceMappingURL=sign-up.js.map