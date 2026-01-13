import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import{ createBid, getBidsForGig , hireBid} from "../controllers/bids.Controller.js";

const bidRouter = Router();

bidRouter.post("/",authMiddleware,createBid)
bidRouter.get("/:gigId",authMiddleware,getBidsForGig)
bidRouter.post("/:bidId/hire",authMiddleware,hireBid)

export default bidRouter