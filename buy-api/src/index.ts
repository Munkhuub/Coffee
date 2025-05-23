import { config } from "dotenv";
import authRouter from "./routes/auth.route";
import cors from "cors";
import express from "express";

config();

const port = 3001;

const app = express();
app
  .use(cors())
  .use(express.json())
  // .use("/food", foodRouter)
  // .use("/category", categoryRouter)
  // .use("/count", countRouter)
  // .use("/countAll", countAllRouter)
  .use("/auth", authRouter);
// .use("/orders", orderRouter)
// .use("/user", userRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
