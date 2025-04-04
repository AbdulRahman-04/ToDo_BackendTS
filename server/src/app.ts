import express, { Request, Response } from "express";
import config from "config";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import morgan from "morgan"
import cors from "cors"
import mongoSanitize from "express-mongo-sanitize";

// DATABASE CONNECTION
import "./utils/dbConnect";

// Public API's
import userRouter from "./controllers/public/index";

// Middleware
import authMiddleware from "./middleware/auth";

// Private API's
import todoRoute from "./controllers/private/index";

const app = express();
const PORT: string = config.get<string>("PORT");

// ✅ Middlewares for Security & Performance

app.use(helmet());

app.use(compression());

app.use(cors())

app.use(morgan("dev"))



app.use(mongoSanitize());

// ✅ Rate Limiting (Prevent DDoS attacks)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: "Too many requests from this IP, please try again later!",
});
app.use(limiter);

app.use(express.json());

app.get("/", (req: Request, res: Response): void => {
  try {
    res.status(200).json({ msg: "HELLO IN TS💙" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

// Public API's
app.use("/api/public", userRouter);

// Private Routes with Middleware
app.use("/api/private", authMiddleware, todoRoute);

app.listen(PORT, () => {
  console.log(`YOUR SERVER IS LIVE AT PORT ${PORT}`);
});
