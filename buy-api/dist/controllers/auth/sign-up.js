"use strict";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import { RequestHandler } from "express";
// import { prisma } from "../../db";
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
exports.signup = void 0;
// export const signup: RequestHandler = async (req, res) => {
//   const { username, email, password } = req.body;
//   if (!username || !email || !password) {
//     res
//       .status(400)
//       .json({ message: "Username, email, and password are required" });
//     return;
//   }
//   try {
//     const existingUser = await prisma.user.findFirst({
//       where: { email },
//     });
//     if (existingUser) {
//       res.status(400).json({ message: "User already exists" });
//       return;
//     }
//     const existingUsername = await prisma.user.findFirst({
//       where: { username },
//     });
//     if (existingUsername) {
//       res.status(400).json({ message: "Username already taken" });
//       return;
//     }
//     const hashedPassword = await bcrypt.hash(password, 12);
//     const newUser = await prisma.user.create({
//       data: {
//         username,
//         email,
//         password: hashedPassword,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       },
//       include: {
//         profile: true,
//         bankCard: true,
//         sentDonations: {
//           include: {
//             recipient: {
//               include: { profile: true },
//             },
//           },
//         },
//         receivedDonations: {
//           include: {
//             donor: {
//               include: { profile: true },
//             },
//           },
//         },
//       },
//     });
//     const jwtSecret = process.env.JWT_SECRET;
//     if (!jwtSecret) {
//       console.error("JWT_SECRET environment variable is not set");
//       res.status(500).json({ message: "Server configuration error" });
//       return;
//     }
//     const token = jwt.sign(
//       {
//         userId: newUser.id,
//       },
//       jwtSecret
//     );
//     const { password: _, ...userWithoutPassword } = newUser;
//     res.status(201).json({
//       user: userWithoutPassword,
//       token: `Bearer ${token}`,
//     });
//   } catch (error) {
//     console.error("Signup error:", error);
//     if (error.code === "P2002") {
//       res.status(400).json({ message: "Email or username already exists" });
//       return;
//     }
//     res.status(500).json({
//       message: "Server Error",
//       error: error instanceof Error ? error.message : "Unknown error",
//     });
//   }
// };
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../../db");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res
            .status(400)
            .json({ error: "Username, email, and password are required" });
        return;
    }
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 12);
        const newUser = yield db_1.prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true,
                updatedAt: true,
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
            res.status(500).json({ error: "Server configuration error" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: newUser.id }, jwtSecret);
        res.status(201).json({
            user: newUser,
            token: `Bearer ${token}`,
        });
    }
    catch (error) {
        console.error("Signup error:", error);
        if (error.code === "P2002") {
            const metaTarget = (_a = error.meta) === null || _a === void 0 ? void 0 : _a.target;
            let errorMessage = "Email or username already exists";
            if (metaTarget) {
                if (metaTarget.includes("email")) {
                    errorMessage = "Email already registered";
                }
                else if (metaTarget.includes("username")) {
                    errorMessage = "Username already taken";
                }
            }
            res.status(400).json({ error: errorMessage });
            return;
        }
        res.status(500).json({
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.signup = signup;
//# sourceMappingURL=sign-up.js.map