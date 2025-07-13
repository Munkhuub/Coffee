"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileRouter = void 0;
const express_1 = require("express");
const put_profile_by_id_1 = require("../controllers/profile/put-profile-by-id");
const get_profile_1 = require("../controllers/profile/get-profile");
const createProfileControlller_1 = require("../controllers/profile/createProfileControlller");
exports.profileRouter = (0, express_1.Router)();
exports.profileRouter.post("/", createProfileControlller_1.createProfileController);
exports.profileRouter.get("/:userId", get_profile_1.getProfileById);
exports.profileRouter.put("/:id", put_profile_by_id_1.updateProfileById);
exports.default = exports.profileRouter;
//# sourceMappingURL=profile.route.js.map