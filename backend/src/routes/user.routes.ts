import { Router } from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import { getBiddedGigs } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/bidded-gigs", authMiddleware, getBiddedGigs);

export default userRouter;
