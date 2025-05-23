import { Router } from "express";

import { authenticationMiddleware } from "../middlewares/authentication-middleware";
import { getMe, signin, signup } from "../controllers/auth";

export const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.get("/getMe", authenticationMiddleware, getMe);
export default authRouter;
