"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
// DATABASE CONNECTION
require("./src/utils/dbConnect");
// Public API's
const index_1 = __importDefault(require("./src/controllers/public/index"));
// Middleware
const auth_1 = __importDefault(require("./src/middleware/auth"));
// Private API's
const index_2 = __importDefault(require("./src/controllers/private/index"));
const app = (0, express_1.default)();
const PORT = config_1.default.get("PORT");
// ✅ Body parser 
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); // for form data
// ✅ Middlewares for Security & Performance
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)("dev"));
// ✅ Rate Limiting (Prevent DDoS attacks)
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window
    message: "Too many requests from this IP, please try again later!",
});
app.use(limiter);
// ✅ Health Check Route
app.get("/", (req, res) => {
    try {
        res.status(200).json({ msg: "HELLO IN TS💙" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ msg: error });
    }
});
// ✅ Public API's
app.use("/api/public", index_1.default);
// ✅ Private Routes with Middleware
app.use("/api/private", auth_1.default, index_2.default);
// ✅ Start Server
// app.listen(PORT, () => {
//   console.log(`YOUR SERVER IS LIVE AT PORT ${PORT}`);
// });
exports.default = app;
