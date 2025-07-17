import { config } from "dotenv";
import cors from "cors";
import express from "express";
import profileRouter from "../src/routes/profile.route";
import authRouter from "../src/routes/auth.route";
import { bankCardRouter } from "../src/routes/bankCard.route";
import { donationRouter } from "../src/routes/donation.route";

config();

const app = express();

const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: [
    "https://coffee-git-main-munkhuubs-projects.vercel.app",
    `https://coffee-delta-pearl.vercel.app`,
    `http://localhost:3000`, // for local development
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && origin.includes("vercel.app")) {
    res.header("Access-Control-Allow-Origin", origin);
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app
  .use(express.json())
  .use("/profile", profileRouter)
  .use("/auth", authRouter)
  .use("/bankCard", bankCardRouter)
  .use("/donation", donationRouter);

app.get("/api", (req, res) => {
  res.json({ message: "API is healthy!", timestamp: new Date().toISOString() });
});

app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
