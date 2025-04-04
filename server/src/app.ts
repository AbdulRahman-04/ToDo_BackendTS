import express, { Request, Response } from "express";
import config from "config";

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


// app.use(authMiddleware);

// Private Routes with Middleware
app.use("/api/private", authMiddleware, todoRoute);

app.listen(PORT, () => {
  console.log(`YOUR SERVER IS LIVE AT PORT ${PORT}`);
});
