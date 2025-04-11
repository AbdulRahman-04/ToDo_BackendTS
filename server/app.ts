import express, { Request, Response } from "express";
import config from "config";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import cors from "cors";

// DATABASE CONNECTION
import "./src/utils/dbConnect";

// Public API's
import userRouter from "./src/controllers/public/index";

// Middleware
import authMiddleware from "./src/middleware/auth";

// Private API's
import todoRoute from "./src/controllers/private/index";

const app = express();
const PORT: string = config.get<string>("PORT");

// ✅ Body parser 
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for form data

// ✅ Middlewares for Security & Performance
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(morgan("dev"));

// ✅ Rate Limiting (Prevent DDoS attacks)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: "Too many requests from this IP, please try again later!",
});
app.use(limiter);

// ✅ Health Check Route
app.get("/", (req: Request, res: Response): void => {
  try {
    res.status(200).json({ msg: "HELLO IN TS💙" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

// ✅ Public API's
app.use("/api/public", userRouter);

// ✅ Private Routes with Middleware
app.use("/api/private", authMiddleware, todoRoute);

// ✅ Start Server
// app.listen(PORT, () => {
//   console.log(`YOUR SERVER IS LIVE AT PORT ${PORT}`);
// });

export default app