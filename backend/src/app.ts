import express from "express";
import router from "./routes/auth.route.js";
import gigRouter from "./routes/gig.routes.js";
import cookieParser from "cookie-parser";
import bidRouter from "./routes/bids.routes.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json())
app.use(cookieParser());
app.use("/api/auth",router)
app.use("/api/gig",gigRouter)
app.use("/api/bid",bidRouter)

export default app