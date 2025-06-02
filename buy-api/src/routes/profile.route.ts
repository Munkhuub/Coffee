import { Router } from "express";

import { createProfileController } from "../controllers/profile/createProfileControlller";
import { updateProfileById } from "../controllers/profile/put-profile-by-id";
import { getProfileById } from "../controllers/profile/get-profile";
import { updateProfileByUserId } from "../controllers/profile/put-profile-by-userId";

export const profileRouter = Router();

profileRouter.post("/", createProfileController);
profileRouter.get("/:userId", getProfileById);
profileRouter.put("/:id", updateProfileById);
// profileRouter.put("/:userId", updateProfileByUserId);

export default profileRouter;
