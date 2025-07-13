"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const profile_route_1 = __importDefault(require("../src/routes/profile.route"));
const auth_route_1 = __importDefault(require("../src/routes/auth.route"));
const bankCard_route_1 = require("../src/routes/bankCard.route");
const donation_route_1 = require("../src/routes/donation.route");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app
    .use((0, cors_1.default)())
    .use(express_1.default.json())
    .use("/profile", profile_route_1.default)
    .use("/auth", auth_route_1.default)
    .use("/bankCard", bankCard_route_1.bankCardRouter)
    .use("/donation", donation_route_1.donationRouter);
exports.default = app;
//# sourceMappingURL=index.js.map