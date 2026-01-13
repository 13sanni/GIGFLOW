import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import{ createBid, getBidsForGig , hireBid} from "../controllers/bids.Controller.js";
import { createBidSchema } from "../schemas/bid.schema.js";
import { validate } from "../middlewares/validation.middleware.js";

const bidRouter = Router();

bidRouter.post("/create",authMiddleware,validate(createBidSchema),createBid)
bidRouter.get("/:gigId",authMiddleware,getBidsForGig)
bidRouter.post("/:bidId/hire",authMiddleware,hireBid)

export default bidRouter