import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import{ createBid, getBidsForGig} from "../controllers/bids.Controller.js";

const bidRouter = Router();

bidRouter.post("/",authMiddleware,createBid)
bidRouter.get("/:gigId",authMiddleware,getBidsForGig)
export default bidRouter