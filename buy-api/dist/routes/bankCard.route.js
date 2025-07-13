"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bankCardRouter = void 0;
const express_1 = require("express");
const createBankCardController_1 = __importDefault(require("../controllers/bank-card/createBankCardController"));
const put_bankCard_by_id_1 = require("../controllers/bank-card/put-bankCard-by-id");
exports.bankCardRouter = (0, express_1.Router)();
exports.bankCardRouter.post("/", createBankCardController_1.default);
exports.bankCardRouter.put("/:id", put_bankCard_by_id_1.updateBankCardById);
//# sourceMappingURL=bankCard.route.js.map