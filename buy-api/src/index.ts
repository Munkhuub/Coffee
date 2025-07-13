import { config } from "dotenv";

import cors from "cors";
import express from "express";
import profileRouter from "./routes/profile.route";
import authRouter from "./routes/auth.route";
import { bankCardRouter } from "./routes/bankCard.route";
import { donationRouter } from "./routes/donation.route";

config();

const app = express();
app
  .use(cors())
  .use(express.json())
  .use("/profile", profileRouter)
  .use("/auth", authRouter)
  .use("/bankCard", bankCardRouter)
  .use("/donation", donationRouter);
