import express from "express";
import router from "./routes/auth.route.js";
import gigRouter from "./routes/gig.routes.js";
import cookieParser from "cookie-parser";
import bidRouter from "./routes/bids.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import userRouter from "./routes/user.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://gigflow-beta-ruby.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use("/api/auth", router);
app.use("/api/gig", gigRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/bid", bidRouter);
app.use("/api/bids", bidRouter);
app.use("/api/notifications", notificationRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);
export default app;
