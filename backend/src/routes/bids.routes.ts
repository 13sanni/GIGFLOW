import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import{ createBid } from "../controllers/bids.Controller.js";
const bidRouter = Router();

bidRouter.post("/",authMiddleware,createBid)

export default bidRouter