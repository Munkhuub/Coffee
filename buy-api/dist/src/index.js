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
    .use("/api/profile", profile_route_1.default)
    .use("/api/auth", auth_route_1.default)
    .use("/api/bankCard", bankCard_route_1.bankCardRouter)
    .use("/api/donation", donation_route_1.donationRouter);
app.get("/", (req, res) => {
    res.json({ message: "Buy Me Coffee API is running!" });
});
app.get("/api", (req, res) => {
    res.json({ message: "API is healthy!", timestamp: new Date().toISOString() });
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
});
exports.default = app;
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}
//# sourceMappingURL=index.js.map