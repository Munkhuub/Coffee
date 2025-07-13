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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("../../db");
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Email and password are required" });
        return;
    }
    try {
        const user = yield db_1.prisma.user.findFirst({
            where: { email },
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
        if (!user) {
            console.log("User not found");
            res.status(401).json({ message: "Username or password invalid" });
            return;
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            console.log("Password mismatch");
            res.status(401).json({ message: "Username or password invalid" });
            return;
        }
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error("JWT_SECRET not configured");
            res.status(500).json({ message: "Server configuration error" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
        }, jwtSecret);
        const { password: _ } = user, userWithoutPassword = __rest(user, ["password"]);
        return res.status(200).json({ user: userWithoutPassword, token });
    }
    catch (error) {
        console.error("Signin error:", error);
        res.status(500).json({
            message: "Server Error",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
});
exports.signin = signin;
//# sourceMappingURL=sign-in.js.map