"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUsername = void 0;
const db_1 = require("../../db");
const checkUsername = async (req, res) => {
    const { username } = req.body;
    try {
        const user = await db_1.prisma.user.findFirst({
            where: { username },
        });
        if (!user) {
            res.status(200).json({ isExist: false });
            return;
        }
        res.status(200).json({ isExist: true });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.checkUsername = checkUsername;
//# sourceMappingURL=check-username.js.map