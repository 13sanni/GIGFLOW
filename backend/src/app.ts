import express from "express";
import router from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json())
app.use(cookieParser());
app.use("/api/auth",router)

export default app