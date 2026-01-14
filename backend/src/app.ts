import express from "express";
import router from "./routes/auth.route.js";
import gigRouter from "./routes/gig.routes.js";
import cookieParser from "cookie-parser";
import bidRouter from "./routes/bids.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin:process.env.CLIENT_URL||"http://localhost:5173",
    credentials: true,
}));
app.use("/api/auth",router)
app.use("/api/gig",gigRouter)
app.use("/api/bid",bidRouter)

app.use(errorHandler);
export default app