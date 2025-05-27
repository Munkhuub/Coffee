import { config } from "dotenv";
import authRouter from "./routes/auth.route";
import cors from "cors";
import express from "express";
import profileRouter from "./routes/profile.route";
import { bankCardRouter } from "./routes/bankCard.route";

config();

const port = 3001;

const app = express();
app
  .use(cors())
  .use(express.json())
  .use("/profile", profileRouter)
  .use("/auth", authRouter)
  .use("/bankCard", bankCardRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
