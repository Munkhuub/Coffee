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
const PORT = 3001;
const corsOptions = {
    origin: [
        "https://coffee-git-main-munkhuubs-projects.vercel.app",
        `https://coffee-delta-pearl.vercel.app`,
        `http://localhost:3000`,
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    optionsSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app
    .use(express_1.default.json())
    .use("/profile", profile_route_1.default)
    .use("/auth", auth_route_1.default)
    .use("/bankCard", bankCard_route_1.bankCardRouter)
    .use("/donation", donation_route_1.donationRouter);
app.get("/api", (req, res) => {
    res.json({ message: "API is healthy!", timestamp: new Date().toISOString() });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=index.js.map