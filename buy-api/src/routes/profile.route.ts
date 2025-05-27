import { Router } from "express";

import { createProfileController } from "../controllers/profile/createProfileControlller";
import { updateProfileById } from "../controllers/profile/put-profile-by-id";
import { getProfileById } from "../controllers/profile/get-profile";

export const profileRouter = Router();

profileRouter.post("/", createProfileController);
profileRouter.get("/:id", getProfileById);
profileRouter.put("/:id", updateProfileById);

export default profileRouter;
