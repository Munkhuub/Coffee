import { config } from "dotenv";

import cors from "cors";
import express from "express";
import profileRouter from "../src/routes/profile.route";
import authRouter from "../src/routes/auth.route";
import { bankCardRouter } from "../src/routes/bankCard.route";
import { donationRouter } from "../src/routes/donation.route";

config();

const app = express();
app
  .use(cors())
  .use(express.json())
  .use("/profile", profileRouter)
  .use("/auth", authRouter)
  .use("/bankCard", bankCardRouter)
  .use("/donation", donationRouter);

export default app;
